import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subscription, from, map, switchMap, take } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { MapType } from '@angular/compiler';
import { IUser } from 'src/app/shared/Interfaces/Iauthorization/user.model';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';

type ValifFileExtentions  = 'png' | 'jpg' | 'jpeg';
type ValidMimeType = 'image/png' | 'image/jpeg' | 'image/jpg';

@Component({
  selector: 'app-small-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-popup.component.html',
  styleUrls: ['./small-popup.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class SmallPopupComponent implements OnInit,OnDestroy {
constructor(public userDataService : UserDataService,
            private formBuilder:FormBuilder,
            private loginService:LoginService,
            public subjectsService:SubjectsService
            ){}

// UserFullImagePath:string ='';
private userSubscription!:Subscription;


fullname$ = new BehaviorSubject<string>('');
fullname='';


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {

    this.userSubscription = this.loginService.userFullImagePath.subscribe((fullimagePath:string) => {
      this.subjectsService.newpath$.next(fullimagePath);
      
      this.loginService.UserFullName.subscribe((fullname:string) => {
        this.fullname=fullname;
        this.fullname$.next(fullname);
      })

    })
  }
public ValidFileExtentions:ValifFileExtentions[] =['png' , 'jpg' , 'jpeg']
public ValidMimeTypes:ValidMimeType[] =['image/png' , 'image/jpeg' , 'image/jpg']
    
public  form = this.formBuilder.group({
  file: null,
})

onFileSelect(event:any){
const file:File = event.target.files[0] 
if(!file) return;
const Formdata = new FormData();
Formdata.append('file',file,file.name)

return this.loginService.UploadUserImage(Formdata).subscribe((response)=>{
  let imagepath = this.loginService.getFullImagePath(response.modifiedFileName)
  this.subjectsService.newpath$.next(imagepath)
})
}


}


