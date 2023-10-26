import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface chuckNoriss{
  value?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RightBarService {

  constructor(private http:HttpClient) { }

  getFacts():Observable<chuckNoriss>{
    return this.http.get('https://api.chucknorris.io/jokes/random')
  }


}
