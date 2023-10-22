import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetpostsService } from 'src/app/shared/services/getposts/getposts.service';
import { HttpClientModule } from '@angular/common/http';
import { IPost } from 'src/app/shared/Interfaces/Post/IPots';
import { LoginService } from '../login/services/login.service';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/shared/services/manipulateData/user-data.service';


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
            public userData:UserDataService){}
private takeNum=5;
private skipnum=0;
private size!:number;
private skipPosts:number = 0;
private isLoading:boolean = false;
public AllLoadPosts: any = [];
public data$!: Observable<any>;
  ngOnInit(): void {
    this.PostService.GetSelectedPosts(`take=${this.takeNum}&skip=${this.skipnum}`).subscribe((posts:[IPost[],number])=>{      
      const [ActualPosts,number] = posts
      console.log("actualpost size:", ActualPosts.length);      
      this.size = number-1;
      let newarr = ActualPosts.reverse()
      for(let i = 0;i<newarr.length; i++) {
        this.AllLoadPosts.push(newarr[i]);  
      }
      this.Ref.detectChanges();           //i want to change this
      console.log("allposts: ");
      console.log(this.AllLoadPosts);
      this.skipPosts=this.skipPosts+this.takeNum;
      this.isLoading = false;
      console.log(this.skipPosts);
    }) 
    };

  private queryParam:string = '';
  private numberOfPosts:number = 1;
  private disabled:boolean = false;

  public getposts(event:any=''){
    this.isLoading = true;
    this.queryParam = `take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    console.log(this.queryParam);
    
    if(!this.disabled){
      if(this.skipPosts === this.size){
        event.target.disabled = true;
        console.log('hi mother fuckers');
        this.disabled=true
      }
    this.PostService.GetSelectedPosts(this.queryParam).subscribe((posts:[IPost[],number])=>{
      const [ActualPosts,number] = posts
      this.size=number-1;
      console.log(ActualPosts);
      for(let i = 0;i < ActualPosts.length; i++) {
        this.AllLoadPosts.push(ActualPosts[i]);
      }
      this.Ref.detectChanges();                    //i want to change this
      console.log(this.AllLoadPosts);
      this.skipPosts=this.skipPosts+1;
      this.isLoading = false;
      console.log(this.skipPosts);
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


    if (remainingHeight <= 1 && !this.isLoading) {
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


