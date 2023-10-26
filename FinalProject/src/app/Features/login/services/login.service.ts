import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, tap,BehaviorSubject, switchMap, of, map } from 'rxjs';
import { ILoginUser } from 'src/app/shared/Interfaces/Iauthorization/loginUser.model';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { IUseresPonse } from 'src/app/shared/Interfaces/Iauthorization/userResponse.model';
import { enviroment } from 'src/app/shared/env/env';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http:HttpClient,
              private router:Router,
              private UserDataservice:UserDataService,
    ) { }


    public userSubject = new BehaviorSubject<IUser | null>(null);
    
    get isUserLogedIn():Observable<boolean> {                       //ეს აბრუნებს თუ დალოგინებულია TRUE ს და თუ არარის FALSE-ს
        return this.userSubject.asObservable().pipe(
            switchMap((user:IUser | null):Observable<boolean> =>{
             const isUserAuthenticated = user != null ?  true : false;
             return of(isUserAuthenticated)
            })
        )
    };

    get UserStream():Observable<IUser | null>{
      return this.userSubject.asObservable()       //ეს უბრალოდ ოზერვებლათ გარდაქმნის საბჯექთს
    }



    get UserId():Observable<number>{        //ამას მოაქვს ბეჰავიორიდან აიდი
      return this.userSubject.asObservable().pipe(
        switchMap((user:IUser | null):Observable<number>=>{
          let User = user as IUser;
          return of(parseInt(User.id));
        })
      )
    }


    get UserFullName():Observable<string>{  //ამას მოაქვს უბრალოდ ბეჰავიორ საბჯექთის გადაცემული მნიშვნელობიდან სახელი და გვარი
      return this.userSubject.asObservable().pipe(
        switchMap((user:IUser | null):Observable<string>=>{
          let User = user as IUser;
          const fullname=User.firstname+" "+User.lastname
          return of(fullname);
        })
      )
    }

    getDefaultFullImagePath():string{                           //ამას მოაქვს დეფაულტ ფოტო ბაზიდან (როცა ატვირთული არ აქვს ფოტო)
      return 'http://localhost:3000/api/feed/image/blank.jpg';
    }

    getFullImagePath(imagename:string):string{                //ამას მოაქვს ფოტო რომელიც დამატებულია ბაზაში
      return `http://localhost:3000/api/feed/image/${imagename}`;
    }

    get userFullImagePath():Observable<string>{ 
      return this.userSubject.asObservable().pipe(
        switchMap((User:IUser | null):Observable<string> =>{
          const user = User as IUser;
          console.log(User);
          const DoesAuthorHaveImage = !!user?.imagePath; //ეს კაი რამე ვიპოვე თუ არსებობს imagepath მაშინ იქნება true თუ არადა false
          let fullImagePath = this.getDefaultFullImagePath()
          if(DoesAuthorHaveImage){
            let UserimagePath = user.imagePath as string;
            fullImagePath = this.getFullImagePath(UserimagePath)  
          }
          return of(fullImagePath)
        })
      )  
    }

    getUserImage(){                                               //ეს ქოლს გააკეთებს უბრალოდ თუ jwt-ს გავატან და ფაილს გამოუშვებს
      return this.http.get(`${enviroment.ApiUrl}/user/image`)
    }

    getUserImageName():Observable<{imageName:string}>{           //ეს წამოიღებს სახელს ფაილისას თუ jwt-ს გავატან
      return this.http.get<{imageName:string}>(`${enviroment.ApiUrl}/user/imageName`)
    }


    UpdateUserImagePath(imagePath:string):Observable<IUser>{
      return this.userSubject.pipe(
        map((user:IUser|null):IUser =>{
          let User =user as IUser;
          User.imagePath = imagePath; 
          this.userSubject.next(User);
          return User;
        }
      )
      )}


      private headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });

    UploadUserImage(formData:FormData):Observable<{modifiedFileName:string}>{

      return this.http.post<{modifiedFileName:string}>(
        `${enviroment.ApiUrl}/user/upload`,formData,{headers:this.headers}).pipe(
        tap((modifiedFileName)=>{
          let user = this.userSubject.value;
          let User = user as IUser
          User.imagePath=modifiedFileName.modifiedFileName;
          this.userSubject.next(User)
        })
      )
    }

login(loginObject:ILoginUser):Observable<{token:string}>{
    let {email, password} =loginObject
    return this.http.post<{token:string}>(
      `${enviroment.ApiUrl}/auth/login`, {email,password}).pipe(
        tap((resporse: {token:string}) => {
            localStorage.setItem('token',resporse.token);
            const decodedToken: IUseresPonse = jwtDecode(resporse.token);
            this.userSubject.next(decodedToken.user);

            this.UserDataservice.firstname=decodedToken.user.firstname
            this.UserDataservice.lastname=decodedToken.user.lastname
            this.UserDataservice.nickname = decodedToken.user.nickname
            this.UserDataservice.id=parseInt(decodedToken.user.id)
            
            console.log(decodedToken);
        })
      )
  }

logout():void{
this.userSubject.next(null);
localStorage.removeItem('token');
this.router.navigate(['/Login']);

}

DetelePostById(id:number){

  console.log(`${enviroment.ApiUrl}/feed/${id}`);
  
  return this.http.delete(`${enviroment.ApiUrl}/feed/${id}`)
}


}
