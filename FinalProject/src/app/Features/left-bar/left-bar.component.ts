import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { LoginService } from '../login/services/login.service';



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
              private manipulatesaerviuce:ManipulationService){}

  logOut(): void {
    this.loginservice.logout();
    this.manipulatesaerviuce.leftbarDisabled=false;
    this.manipulatesaerviuce.topBarsDisabled=false
    this.manipulatesaerviuce.rightBarsDisabled=false
    this.manipulatesaerviuce.logedIn=false;
  }
  
  openPdf() {
    const pdfLink = document.getElementById('pdfLink') as HTMLAnchorElement;
    pdfLink.click();
  }
}
