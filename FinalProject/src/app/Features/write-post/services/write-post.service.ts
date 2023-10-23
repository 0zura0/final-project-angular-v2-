import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUseresPonse } from 'src/app/shared/Interfaces/Iauthorization/userResponse.model';
import { FeedPostResponse } from 'src/app/shared/Interfaces/Post/feedPostResponse';
import { enviroment } from 'src/app/shared/env/env';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class WritePostService {

  constructor(private http:HttpClient ) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  
  public PostThePost(body: string):Observable<IUseresPonse>{
    return this.http.post<IUseresPonse>(`${enviroment.ApiUrl}/feed`,{"body":body},{headers:this.headers})
  }

  getAuthorAndPoststByid(id:number):Observable<User>{
    return this.http.get<User>(`${enviroment.ApiUrl}/user/usersInfo?id=${id}`)
  }

}
