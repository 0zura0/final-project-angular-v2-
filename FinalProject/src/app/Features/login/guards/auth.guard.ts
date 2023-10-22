import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable, of, switchMap } from 'rxjs';



export const authGuard: CanActivateFn = (route, state) => {
  const Loginservice = inject(LoginService);
  const router = inject(Router);
  
  return Loginservice.isUserLogedIn.pipe(
    switchMap((isUserLogedIn:boolean):Observable<boolean> =>{
      if(isUserLogedIn){
        console.log("hi from gurad loged in");
        
        return of(isUserLogedIn)
      }else{
        router.navigate(['/Login'])
        console.log("hi from gurad not loged in");
        return of(false)
      }
    })
  )
};
