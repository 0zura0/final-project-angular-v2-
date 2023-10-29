import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Query, Res, Param, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Observable, of, switchMap } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { saveImageFileToStorage } from 'src/auth/helpers/imageStorage';
import { FriendRequest, friendRequestStatus } from 'src/auth/models/friendRequest';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserService } from 'src/auth/services/user/UserService';

@Controller('user')
export class UserController {
    FeedService: any;
    constructor(private authService: AuthService,
        private userService: UserService) { }

    @Get('usersInfo')
    getUsersInfo(@Query("id") id: number): Observable<User> {
        return this.userService.findeUserByid(id);
    }

    //ფაილის აფლოუდი ბაზაში jwt ს გამოყენებით
    @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveImageFileToStorage))
    UploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): Observable<{modifiedFileName:string} | { error: string }> {

        if (!file.filename) return of({ error: "file must be png or jpeg or jpg" })
        const UserId = req.user.id;
        console.log(UserId);
        
        return this.userService.updateUserUserByID(UserId, file.filename).pipe(
            switchMap(():Observable<{modifiedFileName:string} | { error: string }> =>{
                return of({modifiedFileName:file.filename})
            })
        )
    }

    //ფაილის წამოღება jwt გამოყენებით
    @UseGuards(JwtGuard)
    @Get('image')
    findImage(@Request() req, @Res() res): Observable<Object> {
        const userId: number = req.user.id;
        return this.userService.FindImageNameByUserID(userId).pipe(
            switchMap((imageName: string): Observable<Object> => {
                return of(res.sendFile(imageName, { root: './images' }))
            })
        )
    }


    //ფაილის წამოღება jwt გამოყენებით
    @UseGuards(JwtGuard)
    @Get('imageName')
    findUserImageName(@Request() req, @Res() res): Observable<{imageName:string}> {
        const userId: number = req.user.id;
        return this.userService.FindImageNameByUserID(userId).pipe(
            switchMap((imageName: string): Observable<{imageName:string}> => {
                return of({imageName})
            })
        )
    }

    @UseGuards(JwtGuard)
    @Get('ImageById')
    GetUserPhotoById(@Query("id") id:number): Observable<{imageName:string}> {
        return this.userService.FindImageNameByUserID(id).pipe(
            switchMap((imageName: string): Observable<{imageName:string}> => {
                return of({imageName})
            })
        )
    }


    // @UseGuards(JwtGuard)
    @Get(':userID')
    FindUserById(@Param("userID")userStringId:string ): Observable<User> {
        const userIntId = parseInt(userStringId);
        return this.userService.findeUserByid(userIntId)
    }



    @UseGuards(JwtGuard)
    @Post('friend-request/send/:reciverId')
    SendConnectionRequest(@Param("reciverId") reciverStringId:string, @Request() req ): Observable<FriendRequest | {error:string}> {
        const reciverId = parseInt(reciverStringId);
        // return this.userService.
        return this.userService.sendFriendReqest(reciverId,req.user)
    }

    @UseGuards(JwtGuard)
    @Get('friend-request/status/:reciverId')
    getFriendRequestStatus(@Param("reciverId")reciverStringId:string, @Request() req): Observable<friendRequestStatus | {notSend:boolean}> {
        const userIntId = parseInt(reciverStringId);
        return this.userService.getFriendRequestStatus(userIntId, req.user)
    }


    @UseGuards(JwtGuard)
    @Put('friend-request/response/:friendRequestId')
    respondToFriendRequest(@Param("friendRequestId")friendRequestStringId:string, 
                            @Body() statusResponse:friendRequestStatus
                            ): Observable<friendRequestStatus | {notSend:boolean}>{

        const friendRequestId = parseInt(friendRequestStringId);
        return this.userService.RespondToFriendRequest(statusResponse, friendRequestId)
    }


    @UseGuards(JwtGuard)
    @Get('friend-request/me/recivedRequests')
    getFriendRequestFromResipients(@Request() req): Observable<friendRequestStatus[] | {notSend:boolean}> {
        return this.userService.getFriendRequestFromResipients(req.user)
    }

    

    @Get("GiveMeUserByName/:name")
    getUserByName(@Param('name') username:string): Observable<User |{error:string}>{
        console.log(username);
        
        return this.userService.getUserByName(username);
    }

    @Delete("Declinedstatus/:id")
    deleteStatusById(@Param('id') id:string): Observable<any>{
        let newid = parseInt(id)
        return this.userService.deleteRequestByID(newid)
    }



}



