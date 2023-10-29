import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from, map } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { log } from 'console';

@Injectable()
export class FeedService {
    constructor( 
        @InjectRepository(FeedPostEntity)
        private readonly feedPostrepository: Repository<FeedPostEntity>
    ){}

createPost( user:User,  feedpost:FeedPost):Observable<FeedPost> {
    feedpost.author=user
    console.log(user);
    return from(this.feedPostrepository.save(feedpost));
}


findAllPosts():Observable<FeedPost[]>{
    return  from(this.feedPostrepository.find());
}

updatePost(id:number, feedpost:FeedPost):Observable<UpdateResult> {
    return from(this.feedPostrepository.update(id,feedpost));
}

deletePost(id:number):Observable<DeleteResult>{
    return from(this.feedPostrepository.delete(id));
}

getPostsWithAuthors(take: number = 10, skip: number = 0) {
    return from(
      this.feedPostrepository.findAndCount({
        relations: ['author'],         
        take,
        skip,
      })
    );
  }


}
