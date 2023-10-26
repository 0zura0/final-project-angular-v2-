import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SmallPopupComponent } from '../small-popup/small-popup.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RightBarService } from './services/right-bar.service';


@Component({
  selector: 'app-right-bar',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RightBarComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private http:HttpClient,
              private rightBarService:RightBarService){
              }
  public chuckNorrisFact$ = new BehaviorSubject<string>('')
  
  ngOnInit(): void {
  this.rightBarService.getFacts().subscribe((value)=>{
    this.chuckNorrisFact$.next(value.value as string);
    
  }
  )
   
  }

  public openPlogOut(){
    this.dialog.open(SmallPopupComponent,{
      width:'450px',
      height:'400px',
    })
  }


  
}
