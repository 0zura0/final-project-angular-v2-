import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedPostResponse } from 'src/app/shared/Interfaces/Post/feedPostResponse';
import { enviroment } from 'src/app/shared/env/env';

@Injectable({
  providedIn: 'root'
})
export class WritePostService {

  constructor(private http:HttpClient ) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  
  public PostThePost(body: string):Observable<any>{
    return this.http.post<any>(`${enviroment.ApiUrl}/feed`,{"body":body},{headers:this.headers})
  }

}
