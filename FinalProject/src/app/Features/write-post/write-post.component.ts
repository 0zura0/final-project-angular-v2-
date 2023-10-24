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
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';

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
              private Ref:ChangeDetectorRef,
              public subjectsService:SubjectsService){}

  public postPressed:boolean = false;
  public isvalid:boolean = false;
    public form = this.formbuilder.group({
      textarea:['', Validators.required]
    });



  log(){
    this.manipulationService.isLoading=true;
    // this.postPressed=true;
    if(this.form.valid){
    this.PostDataFromTextarea()
  
    setTimeout(() => {
    this.getAuthorAndPoststByid(this.userDataService.id).subscribe((author)=>{
      const feeds = author.feedPosts as IPost[];
      console.log(author);
      const sortedFeeds = feeds.sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime())
      console.log(sortedFeeds);
      const feed = sortedFeeds.at(0) as IPost
      console.log(feed);
      
      
      let mynewPost:FeedPostResponse ={
        author: {
        email: author.email as string,
        firstname: author.firstname as string,
        id: author.id as number,
        imagePath: author.imagePath as string,
        lastname: author.lastname as string,
        nickname: author.nickname as string,
        phone: author.phone as string,
        role: author.role as "user",
      },
        body: feed.body as string,
        created_at: feed?.created_at,
        id:feed?.id
      }

      this.subjectsService.LocalArray=[mynewPost,...this.subjectsService.LocalArray]
      this.subjectsService.localPostIdarray.push(feed?.id) 
      this.subjectsService.arraySubject.next(this.subjectsService.LocalArray)     
    })
    }, 100);
  }
    this.manipulationService.isLoading=false; 
  }

    public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  PostDataFromTextarea(){
    return this.writePostService.PostThePost(this.form.get('textarea')?.value as string,this.headers).subscribe()
  }

  getAuthorAndPoststByid(id:number){
    return this.writePostService.getAuthorAndPoststByid(id)
  }
  
}
