import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { FeedPost } from 'src/feed/models/post.interface';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly UserRepository:Repository<UserEntity>,
){}

    findeUserByid(id:number):Observable<User>{
        return from(
            this.UserRepository.findOne({select: ['id', 'firstname', 'lastname', 'nickname','email', 'password', 'phone', 'role','imagePath'],
            where:{ id},relations:['feedPosts']})
        ).pipe(map((user:User):User => {
            delete user.password;
            return user
        }))
        }


        updateUserUserByID(id:number, imagePath:string):Observable<UpdateResult>{
            const user = new UserEntity();
            user.id = id;
            user.imagePath = imagePath;
            return from(this.UserRepository.update(id, user));
        }



    FindImageNameByUserID(id:number):Observable<string>{
        return from(this.UserRepository.findOne({where:{id}})).pipe(
            map((user:User)=>{
                return user.imagePath
            })
        )
    }

    // GetUserWithallPostData(email:string, password:string):Observable<[FeedPost]>{
    //     return from(this.UserRepository.findOne({select: ['id', 'firstname', 'lastname', 'nickname','email', 'password', 'phone', 'role'],
    //     where:{email},relations:['feedPosts']}))
    // }

    
}
