import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/Routes/app-routing.module';
import { AppComponent } from './app/Core/appComp/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';



bootstrapApplication(AppComponent
  ,{
  providers:[
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideAnimations(),  
    provideHttpClient()
]
}
)
  .catch(err => console.error(err));


