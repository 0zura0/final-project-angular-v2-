import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { WritePostComponent } from '../write-post/write-post.component';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { LoginService } from '../login/services/login.service';


@Component({
  selector: 'app-topcomponent',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './topcomponent.component.html',
  styleUrls: ['./topcomponent.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TopcomponentComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public subjectsService:SubjectsService,
              private loginService:LoginService,
    ){}
  ngOnInit(): void {
    this.loginService.userFullImagePath.subscribe((fullimagePath:string) => {
      this.subjectsService.newpath$.next(fullimagePath);
      
    })
  }

  public openDiealogue(){
    this.dialog.open(WritePostComponent,{
      width:'450px',
      height:'400px',
    })
  
  }
}
