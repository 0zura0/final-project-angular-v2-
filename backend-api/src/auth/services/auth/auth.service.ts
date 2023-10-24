import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Observable, ObservableInput, catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

constructor(@InjectRepository(UserEntity) private readonly UserRepository:Repository<UserEntity>,
            private jwtService: JwtService
){}

hashPassword(password:string):Observable<string> {
    return from(bcrypt.hash(password,12))
}

registerAccount(user:User):Observable<User>{
    const {firstname,
           lastname,
           nickname,
           phone,
           email,
           password} = user;
        console.log(firstname,
            lastname,
            nickname,
            phone,
            email,
            password);
        
return this.hashPassword(password).pipe(
    switchMap((hashPassword:string) => {
        return from(this.UserRepository.save({
            firstname,
            lastname,
            nickname,
            phone,
            email,
            password:hashPassword
        })).pipe(
            map((user:User) => {
                delete user.password;
                return user;
            })
        )
    })
)
}

ValidateUser(email:string, password:string):Observable<User>{
    return from(this.UserRepository.findOne({select: ['id', 'firstname', 'lastname', 'nickname','email', 'password', 'phone', 'role','imagePath'],
    where:{ email}})).pipe(
        switchMap((user:User):any => {

            let ans:boolean=bcrypt.compareSync(password,user.password)
            console.log(ans);
            if(ans) {
                delete user.password
                return of(user)
            }
        })
    )
}


login(emailPass:User):Observable<string>{
    const {email,password} = emailPass;
    return this.ValidateUser(email,password).pipe(
        switchMap((user:User):Observable<string> => {
            if(user){
                return of(this.jwtService.sign({user}))
            }
        })
    )
}


findeUserByid(id:number):Observable<User>{
return from(
    this.UserRepository.findOne({select: ['id', 'firstname', 'lastname', 'nickname','email', 'password', 'phone', 'role'],
    where:{ id},relations:['feedPosts']})
).pipe(map((user:User):User => {
    delete user.password;
    return user
}))
}















                                            

                                                // switchMap((user:User):any => {
                                                //     bcrypt.compare(password, user.password).then((value:boolean) => {
                                                //         console.log(value);
                                                //         if (value) {
                                                //             // console.log(user);
                                                //             return user;
                                                //         }
                                                //     })
                                                // })

                                                    // .pipe(
                                                    //     map((isValidpassword:boolean)=>{
                                                    //         console.log(isValidpassword);
                                                            
                                                    //         if(isValidpassword){
                                                    //             delete user.password;
                                                    //             return user
                                                    //         }else{
                                                    //             console.log("nope");
                                                                
                                                    //         }
                                                    //     })
                                                    // )
//                                                 })
//                                             )
// }

// logIN(user:User):Observable<string> {
// logIN(user:User):any {
    
// const {email,password} = user;
//     this.ValidateUser(email, password).then((value)=>{console.log(value);
//      value})



// .pipe(
//     switchMap((user:User) => {
//         // console.log("hi from swichmap");
//         console.log(user+" from swichmap");
//         if(user){
//             //create jwt-credentials
//            let ans : Observable<string> = from(this.jwtService.signAsync({user}))
//             console.log(ans);
//             return from(ans);
//         }
//     })
// )

}






// }
