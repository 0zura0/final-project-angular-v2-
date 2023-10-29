import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token=localStorage.getItem('token');
  if(token) {
    request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
    }
    );
  }

    return next.handle(request);
  }
  
}

// import { HttpInterceptorFn } from "@angular/common/http";

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   let token=localStorage.getItem('token');
//   if(token) {
//     req = req.clone({
//         setHeaders:{
//           Authorization: `Bearer ${token}`
//         }
//     }
//     );
//   }
//   console.log(req);
  
// return next(req)
// }