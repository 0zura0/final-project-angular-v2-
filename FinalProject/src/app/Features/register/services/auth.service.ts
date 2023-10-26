import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewUser } from 'src/app/shared/Interfaces/Iauthorization/newUser.model';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { enviroment } from 'src/app/shared/env/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(newUser:INewUser): Observable<IUser> {
    return this.http.post<IUser>(
      `${enviroment.ApiUrl}/auth/register`, newUser)
  }
}
