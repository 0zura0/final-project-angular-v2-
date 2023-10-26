import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { LoginService } from '../login/services/login.service';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { WritePostService } from '../write-post/services/write-post.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NetWorkRequestComponent } from '../net-work-request/net-work-request.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FriendRequest, FriendRequestWithreciverAndCreators } from 'src/app/shared/Interfaces/FriendRequestedStatus/status.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConnectToOthersService } from '../request-profile/RequestProfile/connect-to-others.service';
import { HttpHeaders } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';
import { FollowersComponent } from '../followers/followers.component';


@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [CommonModule , MatDialogModule,MatBadgeModule],
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LeftBarComponent implements OnInit, OnDestroy {
private frienrequestSubscription!: Subscription;


  constructor(private loginservice:LoginService,
              private manipulatesaerviuce:ManipulationService,
              public subjectsService:SubjectsService,
              private userDataService:UserDataService,
              private sritePostService:WritePostService,
              private dialog: MatDialog,
              private overlay: Overlay,
              public connectToOthersService:ConnectToOthersService){}
  ngOnDestroy(): void {
    this.frienrequestSubscription.unsubscribe();
  }
  public headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  ngOnInit(): void {
    this.frienrequestSubscription = this.connectToOthersService.getFriendRequests(this.headers).subscribe((friendRequests:FriendRequestWithreciverAndCreators[])=>{
      
      this.connectToOthersService.friendRequest=friendRequests.filter((friendRequest:FriendRequestWithreciverAndCreators)=>{
        console.log("cretor");
        console.log(friendRequest.creator);
        return friendRequest.status ==="pending"
      });

      this.subjectsService.RequestarrayLenght$.next(this.connectToOthersService.friendRequest.length)
    })

  }

  Seefollowers(){
   this.manipulatesaerviuce.followersDialog= this.dialog.open(FollowersComponent,{
      width:'550px',
    })
  }

  updateNetworkinfo(): void {
    setInterval(()=>{
      this.frienrequestSubscription = this.connectToOthersService.getFriendRequests(this.headers).subscribe((friendRequests:FriendRequestWithreciverAndCreators[])=>{
        this.connectToOthersService.friendRequest=friendRequests.filter((friendRequest:FriendRequestWithreciverAndCreators)=>{
          return friendRequest.status ==="pending"
        });
  
        this.subjectsService.RequestarrayLenght$.next(this.connectToOthersService.friendRequest.length)
        this.subjectsService.localRequestArray$.next(this.connectToOthersService.friendRequest)
        console.log();
      })
      console.log("updated"); 
    },10000)
  }

  logOut(): void {
    this.loginservice.logout();
    this.manipulatesaerviuce.leftbarDisabled=false;
    this.manipulatesaerviuce.topBarsDisabled=false
    this.manipulatesaerviuce.rightBarsDisabled=false
    this.manipulatesaerviuce.logedIn=false;


    this.subjectsService.arraySubject.next([])
    this.subjectsService.LocalArray=[]
    this.subjectsService.localPostIdarray=[]
    this.manipulatesaerviuce.skipPosts=0

    this.userDataService.email=''
    this.userDataService.firstname=''
    this.userDataService.lastname=''
    this.userDataService.id=0;
    this.userDataService.nickname=''
    this.userDataService.phone=''
  }

  private overlayRef!: OverlayRef | null;

  OpenNetworkPop(event: Event) {
    const button = event.target as HTMLElement;
    if (button) {
      const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(button)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
          },
        ]);
  
      this.overlayRef = this.overlay.create({
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        panelClass: 'your-custom-panel-class',
      });
  
      const dialogRef = this.overlayRef.attach(new ComponentPortal(NetWorkRequestComponent));
      this.manipulatesaerviuce.dialogRef=dialogRef;
    }


  }
  
  


















  
  openPdf() {
    const pdfLink = document.getElementById('pdfLink') as HTMLAnchorElement;
    pdfLink.click();
  }
}
