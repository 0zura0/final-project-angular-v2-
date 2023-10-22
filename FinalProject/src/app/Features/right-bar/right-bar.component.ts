import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SmallPopupComponent } from '../small-popup/small-popup.component';


@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RightBarComponent {
  constructor(public dialog: MatDialog){}

  public openPlogOut(){
    this.dialog.open(SmallPopupComponent,{
      width:'450px',
      height:'400px',
    })
  }
  
}
