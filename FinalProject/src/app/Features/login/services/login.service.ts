import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable, tap,BehaviorSubject, switchMap, of } from 'rxjs';
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


    private userSubject = new BehaviorSubject<IUser | null>(null);
    
    get isUserLogedIn():Observable<boolean> {
        return this.userSubject.asObservable().pipe(
            switchMap((user:IUser | null):Observable<boolean> =>{
             const isUserAuthenticated = user != null ?  true : false;
             return of(isUserAuthenticated)
            })
        )
    };

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

            
            console.log(decodedToken);
        })
      )
  }

logout():void{
this.userSubject.next(null);
localStorage.removeItem('token');
this.router.navigate(['/Login']);

}
}
