import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUseresPonse } from 'src/app/shared/Interfaces/Iauthorization/userResponse.model';
import { FeedPostResponse } from 'src/app/shared/Interfaces/Post/feedPostResponse';
import { enviroment } from 'src/app/shared/env/env';
import { User } from '../models/user.interface';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';

@Injectable({
  providedIn: 'root'
})
export class WritePostService {

  constructor(private http:HttpClient,
              public subjectsService:SubjectsService  ) { }

  
  public PostThePost(body: string,Headers:HttpHeaders):Observable<IUseresPonse>{
    return this.http.post<IUseresPonse>(`${enviroment.ApiUrl}/feed`,{"body":body},{headers:Headers})
  }

  getAuthorAndPoststByid(id:number):Observable<User>{
    return this.http.get<User>(`${enviroment.ApiUrl}/user/usersInfo?id=${id}`)
  }

}
