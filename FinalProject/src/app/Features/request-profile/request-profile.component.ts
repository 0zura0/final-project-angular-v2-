import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchserviceService } from '../topcomponent/services/searchservice.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FriendRequest, friendRequestStatus } from 'src/app/shared/Interfaces/FriendRequestedStatus/status.model';
import { BehaviorSubject, Observable, Subscription, take, tap, throwError } from 'rxjs';
import { ConnectToOthersService } from './RequestProfile/connect-to-others.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-request-profile',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './request-profile.component.html',
  styleUrls: ['./request-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class RequestProfileComponent implements OnInit , OnDestroy {

public friendRequestStatus$ = new BehaviorSubject<string | null>('')

friendRequestStatusSubscription$?:Subscription

constructor(public searchserviceService:SearchserviceService,
            private connectToOthersService:ConnectToOthersService
            ){}

  ngOnDestroy(): void {
    this.friendRequestStatusSubscription$?.unsubscribe();
  }
  ngOnInit(): void {
    this.friendRequestStatusSubscription$ = this.GetFriendRequestStatus().pipe(
      tap((friendRequestStatus:friendRequestStatus) =>{
        this.friendRequestStatus$.next(friendRequestStatus.status as string);
      })

    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('Internal server error. Please try again later.');
        } else {
            return throwError('Something went wrong.');
        }
      })
    ).subscribe()
  }

  public headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

GetFriendRequestStatus():Observable<friendRequestStatus>{
  let id =parseInt(this.searchserviceService.SearchUserSubject$.value?.id as string)
  return this.connectToOthersService.getFriendRequestStatus(id,this.headers).pipe()
}

addUser():Subscription{
this.friendRequestStatus$.next('pending')
let id =parseInt(this.searchserviceService.SearchUserSubject$.value?.id as string)
return this.connectToOthersService.addConectionUser(id,this.headers).pipe(take(1)).pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status === 500) {
      return throwError('Internal server error. Please try again later.');
    } else {
        return throwError('Something went wrong.');
    }
  })
).subscribe()
}




}
