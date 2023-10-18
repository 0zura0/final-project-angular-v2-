import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { WritePostComponent } from '../write-post/write-post.component';


@Component({
  selector: 'app-topcomponent',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './topcomponent.component.html',
  styleUrls: ['./topcomponent.component.scss'],
})
export class TopcomponentComponent {

  constructor(public dialog: MatDialog){}


  public openDiealogue(){
    this.dialog.open(WritePostComponent,{
      width:'450px',
      height:'400px',
      position: {
        top: '-250px',
        left: '550px',
      },
    })
  }


}
