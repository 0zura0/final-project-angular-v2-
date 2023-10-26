import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchserviceService } from '../topcomponent/services/searchservice.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ObserversModule } from '@angular/cdk/observers';
import { FriendRequest, friendRequestStatus } from 'src/app/shared/Interfaces/FriendRequestedStatus/status.model';
import { BehaviorSubject, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { ConnectToOthersService } from './RequestProfile/connect-to-others.service';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-request-profile',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './request-profile.component.html',
  styleUrls: ['./request-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestProfileComponent implements OnInit , OnDestroy {
//es gadasaketebeli meqneba albat
// User?:IUser


public friendRequestStatus$ = new BehaviorSubject<string | null>('')

friendRequestStatusSubscription$?:Subscription
// userSubscription$?:Subscription
//--------------------------------------------------------

constructor(public searchserviceService:SearchserviceService,
            private connectToOthersService:ConnectToOthersService
            ){}

  ngOnDestroy(): void {
    // this.userSubscription$?.unsubscribe();
    this.friendRequestStatusSubscription$?.unsubscribe();
  }
  ngOnInit(): void {
    this.friendRequestStatusSubscription$ = this.GetFriendRequestStatus().pipe(
      tap((friendRequestStatus:friendRequestStatus) =>{
        // this.friendRequestStatus = friendRequestStatus.status as string;
        this.friendRequestStatus$.next(friendRequestStatus.status as string);
        console.log("status from ngoninit : ");
        console.log(this.friendRequestStatus$.value);
      })

    ).subscribe()
  }

  public headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

GetFriendRequestStatus():Observable<friendRequestStatus>{
  console.log("id from searchUserSubject$: ");
  console.log(this.searchserviceService.SearchUserSubject$.value?.id as string);
  let id =parseInt(this.searchserviceService.SearchUserSubject$.value?.id as string)
  return this.connectToOthersService.getFriendRequestStatus(id,this.headers).pipe()
}

addUser():Subscription{
this.friendRequestStatus$.next('pending')
let id =parseInt(this.searchserviceService.SearchUserSubject$.value?.id as string)
return this.connectToOthersService.addConectionUser(id,this.headers).pipe(take(1)).subscribe()
}




}
