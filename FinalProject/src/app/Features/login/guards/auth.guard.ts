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
        
        return of(isUserLogedIn)
      }else{
        router.navigate(['/Login'])
        return of(false)
      }
    })
  )
};
