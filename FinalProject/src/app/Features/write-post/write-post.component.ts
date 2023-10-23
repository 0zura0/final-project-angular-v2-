import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FeedPostResponse } from 'src/app/shared/Interfaces/Post/feedPostResponse';
import { WritePostService } from './services/write-post.service';
import { HttpHeaders } from '@angular/common/http';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { GetpostsService } from 'src/app/shared/services/getposts/getposts.service';
import { IPost } from 'src/app/shared/Interfaces/Post/IPots';
import { User } from './models/user.interface';

@Component({
  selector: 'app-write-post',
  standalone: true,
  imports: [CommonModule,MatDialogModule,FormsModule,ReactiveFormsModule],
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class WritePostComponent {
  constructor(public userDataService : UserDataService,
              private writePostService:WritePostService,
              private formbuilder: FormBuilder,
              private manipulationService:ManipulationService,
              private getpostsService:GetpostsService,
              private Ref:ChangeDetectorRef){}

  public postPressed:boolean = false;
  public isvalid:boolean = false;
    public form = this.formbuilder.group({
      textarea:['', Validators.required]
    });

  log(){
    this.manipulationService.isLoading=true;
    this.postPressed=true;
    if(this.form.valid){
    this.PostDataFromTextarea()
    }
    
    setTimeout(() => {
    this.getAuthorAndPoststByid(parseInt(this.userDataService.id)).subscribe((author)=>{
      const length = author.feedPosts?.length as number-1
      const feed = author.feedPosts?.at(length)
      let mynewPost ={
        author: {
        email: author.email,
        firstname: author.firstname,
        id: author.id,
        imagePath: author.imagePath,
        lastname: author.lastname,
        nickname: author.nickname,
        phone: author.phone,
        role: author.role
      },
        body: feed?.body,
        created_at: feed?.created_at,
        id:feed?.id
      }      
      this.manipulationService.AllLoadPosts =[mynewPost,...this.manipulationService.AllLoadPosts]
      console.log(this.manipulationService.AllLoadPosts);
      
    })
    }, 100);
    this.manipulationService.isLoading=false; 
  }

  PostDataFromTextarea(){
    return this.writePostService.PostThePost(this.form.get('textarea')?.value as string).subscribe()
  }

  getAuthorAndPoststByid(id:number){
    return this.writePostService.getAuthorAndPoststByid(id)
  }
  
}
