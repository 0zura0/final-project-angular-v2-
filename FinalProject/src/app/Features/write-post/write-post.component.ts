import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FeedPostResponse } from 'src/app/shared/Interfaces/Post/feedPostResponse';
import { WritePostService } from './services/write-post.service';
import { HttpHeaders } from '@angular/common/http';

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
              private formbuilder: FormBuilder){}

  public postPressed:boolean = false;
  public isvalid:boolean = false;
    public form = this.formbuilder.group({
      textarea:['', Validators.required]
    });

  log(){
    this.postPressed=true;
    if(this.form.valid){
    this.PostDataFromTextarea()
    }
  }

  PostDataFromTextarea(){
    return this.writePostService.PostThePost(this.form.get('textarea')?.value as string).subscribe((res)=>{console.log(res)})
  }

  
}
