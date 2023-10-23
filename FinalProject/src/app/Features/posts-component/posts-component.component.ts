import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetpostsService } from 'src/app/shared/services/getposts/getposts.service';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from 'src/app/shared/Interfaces/Post/IPots';
import { LoginService } from '../login/services/login.service';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';


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
            public manipulationService:ManipulationService){}
private takeNum=5;
private skipnum=0;
private size!:number;
private isLoading:boolean = false;

  ngOnInit(): void {
    this.PostService.GetSelectedPosts(`take=${this.takeNum}&skip=${this.skipnum}`).subscribe((posts:[IPost[],number])=>{      
      const [ActualPosts,number] = posts
      let newarr = ActualPosts.reverse()
      for(let i = 0;i<newarr.length; i++) {
        this.manipulationService.AllLoadPosts.push(newarr[i]);  
      }
      this.manipulationService.DbItems=number
      console.log("allposts: ");
      this.manipulationService.skipPosts+=this.takeNum;
      this.Ref.detectChanges();           //i want to change this
      this.manipulationService.isLoading = false;
      console.log(this.manipulationService.skipPosts);
    }) 
    console.log('stril ngonInit');
    };

  private queryParam:string = '';
  private numberOfPosts:number = 1;
  private disabled:boolean = false;




  public getposts(event:any=''){
    this.manipulationService.isLoading = true;
    console.log('queryParam');
    
    this.queryParam = `take=${this.numberOfPosts}&skip=${this.manipulationService.skipPosts}`;
    console.log("queryParamueryparameter is ",this.queryParam);
    
    console.log(this.queryParam);
    if(!this.disabled){
      console.log("in disabled state");
      console.log("size is"+this.size);
      console.log("manipulation service skippost is ",this.manipulationService.skipPosts);
      
      if(this.manipulationService.skipPosts === this.manipulationService.DbItems){
        event.target.disabled = true;
        this.disabled=true      
      }
    this.PostService.GetSelectedPosts(this.queryParam).subscribe((posts:[IPost[],number])=>{
      const [ActualPosts,number] = posts
      this.size=number;
      console.log(ActualPosts);
      for(let i = 0;i < ActualPosts.length; i++) {
        this.manipulationService.AllLoadPosts.push(ActualPosts[i]);
      }
      this.manipulationService.DbItems=number-1 
      this.manipulationService.skipPosts+=1;
      this.Ref.detectChanges();                    //i want to change this
      this.manipulationService.isLoading = false;
      console.log(this.manipulationService.skipPosts);
    })
  }
  }





  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    console.log("hi from onscroll");
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const remainingHeight = documentHeight - (scrollY + windowHeight);    
    if (remainingHeight <= 1 && !this.manipulationService.isLoading) {
      console.log(window.innerHeight + window.scrollY);
      console.log(window.scrollY);
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
  }


