import { Body, Controller, Get, Post, Put,Param, Delete } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
constructor(private FeedService: FeedService){}

@Post()
create(@Body() post :FeedPost):Observable<FeedPost>{ 
    console.log(post);
          
    return this.FeedService.createPost(post)
}

@Get()
findAllPosts():Observable<FeedPost[]> {
    return this.FeedService.findAllPosts();
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




}

