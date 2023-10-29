import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManipulationService } from 'src/app/shared/services/manipulateData/manipulation.service';
import { INewUser } from 'src/app/shared/Interfaces/Iauthorization/newUser.model';
import { AuthService } from './services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private isSubmited=false;
  public action:string='Register';
  constructor(private formBuilder: FormBuilder,
              private router:Router,
              public manipulate : ManipulationService,
              private authService:AuthService){}
  ngOnInit(): void {
  }

  public form = this.formBuilder.group({
    firstname:['', [Validators.required]],
    lastname:['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(7)]],
    confirmPassword: ['', [Validators.required]],  //აქ დავამატებ
    nickname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+995\d{9}$/)]],
  },
  {validators: this.passwordMatchValidator()},
  )

 
  public onSubmit(){
    
    this.isSubmited=true;
    if(this.form.valid){

        let obj : INewUser={
          firstname : this.form.get('firstname')?.value as string,
          lastname: this.form.get('lastname')?.value as string,
          email: this.form.get('email')?.value as string,
          password: this.form.get('password')?.value as string,
          nickname: this.form.get('nickname')?.value as string,
          phone: this.form.get('phone')?.value as string,
        }
        this.authService.register(obj).pipe(
          catchError((error: HttpErrorResponse) => {
            alert("That email is already registered please Enter different email address")
            if (error.status === 500) {
              return throwError('Internal server error. Please try again later.');
            } else {
                return throwError('Something went wrong.');
            }
          })
        ).subscribe(()=>{
          this.router.navigate(["/Login"])
          this.manipulate.wholeTopDiv=true //აქ ჩნდება
        })
        
  }

  }

  public hasError(controlName:string, errorName:string){
    return  this.isSubmited && this.form.get(controlName)?.hasError(errorName);
  }

  public passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
if(confirmPassword?.value!==''){
      if (password?.value !== confirmPassword?.value) {
        control.get('confirmPassword')?.setErrors({'passwordMismatch': true} )
      } 
    }
      return null;
    };
  }
  
  public disabled(): boolean {
    if(this.form.get('password')?.errors==null 
      && this.form.get('confirmPassword')?.errors===null
    ){
      return false;
    }
    return false
  }

  public ToLogin(){
    this.router.navigate(['/Login']);
    
  }
}
