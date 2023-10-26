import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../../Interfaces/Post/IPots';
import { enviroment } from '../../env/env';
import { FeedPostResponse } from '../../Interfaces/Post/feedPostResponse';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpostsService {

  constructor(private http:HttpClient ) {}

  public GetSelectedPosts(params: string){
    return this.http.get<[FeedPostResponse[],number]>(`${enviroment.ApiUrl}/feed?${params}`)
  }

}
