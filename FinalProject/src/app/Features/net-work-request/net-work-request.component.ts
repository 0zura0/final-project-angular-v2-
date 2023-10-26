import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { ConnectToOthersService } from '../request-profile/RequestProfile/connect-to-others.service';
import { FriendRequest, FriendRequestWithreciverAndCreators } from 'src/app/shared/Interfaces/FriendRequestedStatus/status.model';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscription, take, tap, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { catchError} from 'rxjs/operators';
import { LoginService } from '../login/services/login.service';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';

@Component({
  selector: 'app-net-work-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './net-work-request.component.html',
  styleUrls: ['./net-work-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class NetWorkRequestComponent implements OnInit {
  

  public headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private manipulationService:ManipulationService,
              public connectToOthersService:ConnectToOthersService,
              private loginService:LoginService,
              public subjectsService:SubjectsService){}

// public localRequestArray$ = new BehaviorSubject<FriendRequestWithreciverAndCreators[]>([]);

  ngOnInit(): void {
    this.subjectsService.localRequestArray$.next(this.connectToOthersService.friendRequest)
  }
 

  closeDialog(): void {
    this.manipulationService.dialogRef.destroy();
  }

  ResponseToFriendRequest(id:number, statusResponse:'accepted' | 'declined'):Subscription
  {

    const handledRequest:FriendRequestWithreciverAndCreators|undefined =this.subjectsService.localRequestArray$.value.find(
      (request:FriendRequestWithreciverAndCreators)=>{
        return request.id === id}
    );

    const unhandledRequest:FriendRequestWithreciverAndCreators[] =this.subjectsService.localRequestArray$.value.filter(
      (request:FriendRequestWithreciverAndCreators)=>{
        return request.id !== handledRequest?.id}
    ) 
    
    //vnaxot es rogori iqneba
    this.subjectsService.localRequestArray$.next(unhandledRequest)

    if(this.subjectsService.localRequestArray$.value.length===0){
      this.manipulationService.dialogRef.destroy();
    }
    this.subjectsService.RequestarrayLenght$.next(unhandledRequest.length)

    return this.connectToOthersService.ResponseToFriendRequest(id,this.headers,statusResponse).pipe(take(1)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('Internal server error. Please try again later.');
        } else {
            return throwError('Something went wrong.');
        }
      })
    ).subscribe()
  };


  deleteDeclinedRequest(id:number, statusResponse:'declined'):Subscription
  {

    const handledRequest:FriendRequestWithreciverAndCreators|undefined =this.subjectsService.localRequestArray$.value.find(
      (request:FriendRequestWithreciverAndCreators)=>{
        return request.id === id}
    );

    const unhandledRequest:FriendRequestWithreciverAndCreators[] =this.subjectsService.localRequestArray$.value.filter(
      (request:FriendRequestWithreciverAndCreators)=>{
        return request.id !== handledRequest?.id}
    ) 
    
    //vnaxot es rogori iqneba
    this.subjectsService.localRequestArray$.next(unhandledRequest)

    if(this.subjectsService.localRequestArray$.value.length===0){
      this.manipulationService.dialogRef.destroy();
    }
    this.subjectsService.RequestarrayLenght$.next(unhandledRequest.length)

    return this.connectToOthersService.deleteStatusById(id).pipe(take(1)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('Internal server error. Please try again later.');
        } else {
            return throwError('Something went wrong.');
        }
      })
    ).subscribe()
  };



}