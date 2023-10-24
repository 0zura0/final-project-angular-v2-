import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }
  
public firstname='';
public lastname='';
public nickname='';

public email='';
public id=0;
public phone='';
public role='';
}
