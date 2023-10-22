import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class LoginComponent {
  http: any;

  constructor(private router: Router,
              private formbuilder: FormBuilder,
              public manipulatesaerviuce :ManipulationService,
              public loginService: LoginService){
              this.manipulatesaerviuce.wholeTopDiv=true;
              }
  ngOnInit(): void {
    localStorage.removeItem('token');


// ეს მერე წასაშლელია----------------------------
    this.form.get('Email')?.setValue("zuraMZ@gmail.com");
    this.form.get('password')?.setValue("12345678");


    // this.container.myContainer.set('1',this.obj)
    // console.log(this.container.myContainer);
  }

  public form =this.formbuilder.group({
    Email:['', Validators.required],
    password:['', Validators.required]
  });
  ToRegister(){
    this.router.navigate(['Register']);
    this.manipulatesaerviuce.wholeTopDiv=false
  }
  public onSubmit(){

    // console.log(this.form.value);
        let loginObj ={
          email: this.form.get('Email')?.value as string,
          password:this.form.get('password')?.value as string,
        }
        this.loginService.login(loginObj).subscribe((result)=>{
          console.log("this is result: "+result);
          this.router.navigate(['/LogedIn']);
          this.manipulatesaerviuce.leftbarDisabled=true;
          this.manipulatesaerviuce.topBarsDisabled=true
          this.manipulatesaerviuce.rightBarsDisabled=true
          this.manipulatesaerviuce.logedIn=true;
        })



    // if( this.container.myContainer.get(this.form.get('Email')?.value)?.password === this.form.get('password')?.value){
    // this.router.navigate(['/Users']);
    // this.container.userGmails=this.form.get('Email')?.value as string;
    // this.container.islogin=false;
    // this.container.isCurrency=true;
    // this.container.isLogOut=true;
    // this.container.isUser=true;
    // }
  }

}
