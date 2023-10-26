import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectToOthersService } from '../request-profile/RequestProfile/connect-to-others.service';
import { HttpHeaders } from '@angular/common/http';
import { FriendRequestWithreciverAndCreators } from 'src/app/shared/Interfaces/FriendRequestedStatus/status.model';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { Subscription, take } from 'rxjs';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

constructor(public connectToOthersService:ConnectToOthersService,
            public subjectsService:SubjectsService,
            private manipulationService:ManipulationService,
            private userDataService:UserDataService){}

public headers = new HttpHeaders({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  ngOnInit(): void {
    this.connectToOthersService.getFriendRequests(this.headers).subscribe((friendRequests:FriendRequestWithreciverAndCreators[])=>{
      console.log(friendRequests); 
      this.subjectsService.followersArray=friendRequests.filter((friendRequest:FriendRequestWithreciverAndCreators)=>{
        if(friendRequest.status==="accepted" && friendRequest.creator.firstname===this.userDataService.firstname && friendRequest.creator.lastname == this.userDataService.lastname){

          friendRequest.creator = friendRequest.reciver
          return friendRequest.status ==="accepted"
        }else{
          return friendRequest.status ==="accepted"
        }
        
      });

      this.subjectsService.FollowersArray$.next(this.subjectsService.followersArray)

    })
  }



  deleteFollower(id:number):Subscription
  {
    const handledRequest:FriendRequestWithreciverAndCreators|undefined =this.subjectsService.FollowersArray$.value.find(
      (request:FriendRequestWithreciverAndCreators)=>{
        return request.id === id}
    );

    const unhandledRequest:FriendRequestWithreciverAndCreators[] =this.subjectsService.FollowersArray$.value.filter(
      (request:FriendRequestWithreciverAndCreators)=>{
        return request.id !== handledRequest?.id}
    ) 
    
    this.subjectsService.FollowersArray$.next(unhandledRequest)  
    return this.connectToOthersService.deleteStatusById(id).pipe(take(1)).subscribe()
  };

}
