import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { enviroment } from 'src/app/shared/env/env';

// interface UserResponse {
//   user: IUser | {error: string};
// }
@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {

  constructor(private http: HttpClient) { }

  public SearchUserSubject$ = new BehaviorSubject<IUser | null>(null);


  getUserByName(name: string): Observable<IUser | {error: string}> {
    return this.http.get<IUser | {error: string}>(`${enviroment.ApiUrl}/user/GiveMeUserByName/${name}`);
  }
  
}
