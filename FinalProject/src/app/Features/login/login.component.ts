import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { LoginService } from './services/login.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    // this.form.get('Email')?.setValue("zuraMZ@gmail.com");
    // this.form.get('password')?.setValue("12345678");

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
        let loginObj ={
          email: this.form.get('Email')?.value as string,
          password:this.form.get('password')?.value as string,
        }
        this.loginService.login(loginObj).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 500) {
              // Handle 500 Internal Server Error
              return throwError('Internal server error. Please try again later.');
            } else {
                return throwError('Something went wrong.');
            }
          })
        ).subscribe((result)=>{
          this.router.navigate(['/LogedIn']);
          this.manipulatesaerviuce.leftbarDisabled=true;
          this.manipulatesaerviuce.topBarsDisabled=true
          this.manipulatesaerviuce.rightBarsDisabled=true
          this.manipulatesaerviuce.logedIn=true;
        })
  }

}
