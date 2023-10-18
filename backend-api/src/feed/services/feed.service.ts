import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class FeedService {
    constructor( 
        @InjectRepository(FeedPostEntity)
        private readonly feedPostrepository: Repository<FeedPostEntity>
    ){}

createPost(feedpost:FeedPost):Observable<FeedPost> {
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

}


