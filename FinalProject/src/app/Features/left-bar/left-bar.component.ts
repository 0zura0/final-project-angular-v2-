import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { LoginService } from '../login/services/login.service';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { WritePostService } from '../write-post/services/write-post.service';



@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [CommonModule,
  ],
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class LeftBarComponent {

  constructor(private loginservice:LoginService,
              private manipulatesaerviuce:ManipulationService,
              private subjectsService:SubjectsService,
              private userDataService:UserDataService,
              private sritePostService:WritePostService){}

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
  
  openPdf() {
    const pdfLink = document.getElementById('pdfLink') as HTMLAnchorElement;
    pdfLink.click();
  }
}
