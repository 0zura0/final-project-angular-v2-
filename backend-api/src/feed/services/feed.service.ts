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

// findPosts(take:number=10,skip:number=0):Observable<FeedPost[]>{
//     return from(this.feedPostrepository.findAndCount({take,skip}).then(([posts]) => {
//         return <FeedPost[]>posts
//     }));
// }


//---მაღლა მუშა ფუნქციაა



// findPosts(take:number=10,skip:number=0):Observable<FeedPost[]>{
//     return from(this.feedPostrepository.findAndCount({take,skip}).then(([posts]) => {
//         return <FeedPost[]>posts
//     }));
// }

getPostsWithAuthors(take: number = 10, skip: number = 0) {
    return from(
      this.feedPostrepository.findAndCount({
        relations: ['author'], // Include the 'author' relationship
        take,
        skip,
      })
    );
  }

// findPosts(take: number = 10, skip: number = 0): Observable<any[]> {
//     return from(
//       this.feedPostrepository
//         .createQueryBuilder('post')
//         .leftJoinAndSelect('post.author', 'author')
//         .orderBy('post.createdAt', 'DESC')
//         .take(take)
//         .skip(skip)
//         .getMany()
//     ).pipe(
//       map((posts: FeedPost[]) => {
//         return posts.map((post) => {
//           return {
//             post: post,
//             author: post.author,
//           };
//         });
//       })
//     );
//   }
// }

}
