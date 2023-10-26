import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { WritePostComponent } from '../write-post/write-post.component';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { LoginService } from '../login/services/login.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchserviceService } from './services/searchservice.service';
import { Subscribable } from 'rxjs';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { RequestProfileComponent } from '../request-profile/request-profile.component';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';


@Component({
  selector: 'app-topcomponent',
  standalone: true,
  imports: [CommonModule,MatDialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './topcomponent.component.html',
  styleUrls: ['./topcomponent.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TopcomponentComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public subjectsService:SubjectsService,
              private loginService:LoginService,
              private formbuilder: FormBuilder,
              private searchserviceService:SearchserviceService,
              private userDataService:UserDataService,
    ){}

    private OpenSearchWindow(){
      this.dialog.open(RequestProfileComponent,{
        width:'450px',
        height:'400px',
      })
    }

  public form =this.formbuilder.group({
      search:['', Validators.required]
  });

  searchThePersonByName():void{
    if(this.form.valid){
      this.searchserviceService.getUserByName(this.form.get('search')?.value as string).subscribe(result=>{
        result = result as IUser
        if(result.firstname ==this.userDataService.firstname && result.lastname ==this.userDataService.lastname){
        alert("you can not search yourself")
          return
        }
        if('error' in result) {
          alert('there is not person with name '+this.form.get('search')?.value as string)
          this.form.get('search')?.setValue("")
        }else{
          if(!result.imagePath){
            result.imagePath =this.loginService.getDefaultFullImagePath()
          }else{
            result.imagePath =this.loginService.getFullImagePath(result.imagePath)
          }
          this.searchserviceService.SearchUserSubject$.next(result as IUser)
          // console.log(this.searchserviceService.SearchUserSubject$.value?.imagePath);
        }
        this.form.get('search')?.setValue('')
        this.OpenSearchWindow()
      })
    }
  }

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
