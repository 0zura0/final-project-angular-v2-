import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetpostsService } from 'src/app/shared/services/getposts/getposts.service';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from 'src/app/shared/Interfaces/Post/IPots';
import { LoginService } from '../login/services/login.service';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { FeedPostResponse } from 'src/app/shared/Interfaces/Post/feedPostResponse';


@Component({
  selector: 'app-posts-component',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class PostsComponentComponent implements OnInit {
constructor(private PostService : GetpostsService,
            private Ref:ChangeDetectorRef,
            public userData:UserDataService,
            public manipulationService:ManipulationService,
            private LoginService:LoginService,
            public subjectsService:SubjectsService){}

private takeNum=5;
private skipnum=0;
private size!:number;
private isLoading:boolean = false;

  ngOnInit(): void {
      this.PostService.GetSelectedPosts(`take=${this.takeNum}&skip=${this.skipnum}`).subscribe((posts:[FeedPostResponse[],number])=>{      
      const [ActualPosts,number] = posts

      for(let i = 0;i<ActualPosts.length; i++) {
        this.subjectsService.LocalArray.push(ActualPosts[i]);  
      }

      this.manipulationService.skipPosts+=this.takeNum;
    //   this.Ref.detectChanges();           //i want to change this
    this.subjectsService.arraySubject.next(this.subjectsService.LocalArray)
      this.manipulationService.isLoading = false;
    }
    )}



  private queryParam:string = '';    //საწყისი ქვერი
  private numberOfPosts:number = 1;  //რამდენი უნდა წამოიღოს
  private disabled:boolean = false;  // ეს რა ჩემ ფეხებათ მინდა არც ვიცი
  
  

  public getposts(event:any=''){
    this.manipulationService.isLoading = true;
    this.queryParam = `take=${this.numberOfPosts}&skip=${this.manipulationService.skipPosts}`;

    console.log("queryParamueryparameter is: ",this.queryParam);
    
    // if(!this.disabled){

      // if(this.manipulationService.skipPosts === this.manipulationService.DbItems){
      //   event.target.disabled = true;
      //   this.disabled=true      
      // }
      // console.log("event target disabeled: ");
      
      // console.log(event.target.disabled);
      

    this.PostService.GetSelectedPosts(this.queryParam).subscribe((posts:[FeedPostResponse[],number])=>{
      const [ActualPosts,number] = posts
      if(ActualPosts.length == 0){
        this.isLoading=false;
        return
      }
      if(this.subjectsService.localPostIdarray.includes(ActualPosts[0].id)){
        this.manipulationService.skipPosts+=1;
        this.isLoading=false;
        return
      }
      for(let i = 0;i < ActualPosts.length; i++) {
        this.subjectsService.LocalArray.push(ActualPosts[i])
      }
      this.manipulationService.skipPosts+=1;
      this.manipulationService.isLoading = false;
      this.subjectsService.arraySubject.next(this.subjectsService.LocalArray)
      console.log('done');
      
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    console.log("hi from onscroll");
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const remainingHeight = documentHeight - (scrollY + windowHeight);  
    if (remainingHeight <= 1 && !this.manipulationService.isLoading) {

      this.getposts(event);
    }
  }

  changeDate(date:Date):string{
    let localdate = new Date(date);
    let now = new Date();
    const timeDifference = now.getTime() - localdate.getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  }

  public ImageNames(name: string):string{
    if(name==null){
      console.log(this.LoginService.getDefaultFullImagePath());
      return this.LoginService.getDefaultFullImagePath()
    }else{
      return this.LoginService.getFullImagePath(name)
    }
  }

  deletePostById(id:number){
    const handledRequest =this.subjectsService.arraySubject.value.find(
      (request)=>{
        return request.id === id}
    );

    const unhandledRequest =this.subjectsService.arraySubject.value.filter(
      (request)=>{
        return request.id !== handledRequest?.id}
    ) 
    this.subjectsService.arraySubject.next(unhandledRequest)
    return this.LoginService.DetelePostById(id).subscribe()
  }
  }


