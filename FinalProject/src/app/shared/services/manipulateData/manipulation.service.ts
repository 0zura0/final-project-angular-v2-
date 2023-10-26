import { ComponentRef, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FollowersComponent } from 'src/app/Features/followers/followers.component';
import { NetWorkRequestComponent } from 'src/app/Features/net-work-request/net-work-request.component';

@Injectable({
  providedIn: 'root'
})
export class ManipulationService {
  constructor() { }
  leftbarDisabled = false;
  topBarsDisabled = false;
  rightBarsDisabled = false;
  wholeTopDiv = false;
  logedIn = false;


  DbItems:number = 0; 
  public AllLoadPosts: any = [];
  skipPosts:number = 0;
  isLoading = false;

  localPostIdarray:number[]=[]

  dialogRef!:ComponentRef<NetWorkRequestComponent>;



  followersDialog!:MatDialogRef<FollowersComponent, any>;
}
