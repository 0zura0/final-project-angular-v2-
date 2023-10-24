import { Body, Controller, Get, Post, Put,Param, Delete, Query, Header, UseGuards,Request, Res } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';

@Controller('feed')
export class FeedController {
constructor(private FeedService: FeedService){}

@UseGuards(JwtGuard)
@Post()
create(@Body() post :FeedPost, @Request() req):Observable<FeedPost>{ 
    console.log(post);
    console.log(req.user);
    
    return this.FeedService.createPost(req.user, post)
}


// @Get()
// findSelected(@Query('take') take:number=1,@Query('skip') skip : number=1):Observable<FeedPost[]> {
//     take=take>20 ? 20 : take;
//     return this.FeedService.findPosts(take,skip);
// }



// @Get()
// async getPostsWithAuthors(@Query('take') take:number=1,@Query('skip') skip : number=0) {
//   const { posts } = await this.FeedService.findPosts(take,skip);
//   return { posts };
// }



@Get()
  getPostsWithAuthors(@Query('take') take:number=1,@Query('skip') skip : number=1):Observable<[FeedPost[], number]> {
    return this.FeedService.getPostsWithAuthors(take,skip);
  }


@Put(':id')
update(
    @Body() feedpost :FeedPost,
    @Param('id') id :number
):Observable<UpdateResult>{ 
    return this.FeedService.updatePost(id, feedpost)
}

@Delete(':id')
deletePost(@Param()id :number):Observable<DeleteResult>{
    return this.FeedService.deletePost(id);
}

@Get('image/:fileName')
findImageByFilename(@Param('fileName') fileName:string,@Res() res){
  console.log("this is filename",fileName);
  if(!fileName || ['null','[null]'].includes(fileName)) return;
  return res.sendFile(fileName,{root:"./images"});
}


}

