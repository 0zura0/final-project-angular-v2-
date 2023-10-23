import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Query, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Observable, of, switchMap } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { saveImageFileToStorage } from 'src/auth/helpers/imageStorage';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserService } from 'src/auth/services/user/user.service';
import { FeedPost } from 'src/feed/models/post.interface';
import { UpdateResult } from 'typeorm';

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
    UploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): Observable<UpdateResult | { error: string }> {
        const filename = file?.filename
        if (!filename) return of({ error: "file must be png or jpeg or jpg" })
        const UserId = req.user.id;
        return this.userService.updateUserUserByID(UserId, filename);
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


}



