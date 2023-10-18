import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private router: Router,private formbuilder: FormBuilder){}
  ngOnInit(): void {
    // this.container.myContainer.set('1',this.obj)
    // console.log(this.container.myContainer);
  }

  public form =this.formbuilder.group({
    Email:['', Validators.required],
    password:['', Validators.required]
  });
  ToRegister(){
    this.router.navigate(['Register']);
  }
  public onSubmit(){
    console.log(this.form.value);

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
