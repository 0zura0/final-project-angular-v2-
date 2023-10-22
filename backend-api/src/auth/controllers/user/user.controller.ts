import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors,Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { saveImageFileToStorage } from 'src/auth/helpers/imageStorage';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { FeedPost } from 'src/feed/models/post.interface';

@Controller('user')
export class UserController {
FeedService: any;
constructor(private authService:AuthService ){}

// @UseGuards(JwtGuard)
@Post('upload')
@UseInterceptors(FileInterceptor('file',saveImageFileToStorage))
UploadImage(@UploadedFile() file:Express.Multer.File, @Request() req):Observable<FeedPost | {error:string}> {           
    const filename = file?.filename
    if(!filename) return of({ error:"file must be png or jpeg or jpg"})
}

}
