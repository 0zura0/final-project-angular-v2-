import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/Routes/app-routing.module';
import { AppComponent } from './app/Core/appComp/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/shared/interceptor/auth.interceptor';
// import { AuthInterceptor, authInterceptor } from './app/shared/interceptor/auth.interceptor';



bootstrapApplication(AppComponent
  ,{
  providers:[
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideAnimations(), 
     
    // provideHttpClient(
    //   withInterceptors([
    //     authInterceptor
    //   ])
    // )

    provideHttpClient(
      withInterceptorsFromDi(),
  ),
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  }
]
}
)
  .catch(err => console.error(err));


