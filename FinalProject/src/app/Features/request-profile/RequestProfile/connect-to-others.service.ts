import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequest, FriendRequestWithreciverAndCreators } from 'src/app/shared/Interfaces/FriendRequestedStatus/status.model';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { enviroment } from 'src/app/shared/env/env';

@Injectable({
  providedIn: 'root'
})
export class ConnectToOthersService {

  constructor(private http:HttpClient) { }

  friendRequest!:FriendRequestWithreciverAndCreators[];

  getFriendRequestStatus(id:number,headers:HttpHeaders):Observable<FriendRequest> {
    return this.http.get<FriendRequest>(`${enviroment.ApiUrl}/user/friend-request/status/${id}`, {headers:headers});
  }
  

  addConectionUser(id: number,headers:HttpHeaders):Observable<FriendRequest | {error:string}>{
    return this.http.post<FriendRequest | {error:string}>(
      `${enviroment.ApiUrl}/user/friend-request/send/${id}`,
      {},
      {headers:headers}
      )
  }

  getFriendRequests(headers:HttpHeaders):Observable<FriendRequestWithreciverAndCreators[]>{
    return this.http.get<FriendRequestWithreciverAndCreators[]>(`${enviroment.ApiUrl}/user/friend-request/me/recivedRequests`,{headers:headers});
  }

  ResponseToFriendRequest(id: number,headers:HttpHeaders,statusResponse:'accepted' | 'declined'):Observable<FriendRequest | {error:string}>{
    return this.http.put<FriendRequest>(
      `${enviroment.ApiUrl}/user/friend-request/response/${id}`,
      {status:statusResponse},
      {headers:headers}
      )
  }

//amas wesit jwt ar unda
  getConnetionUser(id:number):Observable<IUser>{
    return this.http.get<IUser>(`${enviroment.ApiUrl}/user/${id}`)
  }

  deleteStatusById(id:number){
    return this.http.delete<IUser>(`${enviroment.ApiUrl}/user/Declinedstatus/${id}`)
  }


}
