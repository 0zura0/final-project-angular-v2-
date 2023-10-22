import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../Features/login/guards/auth.guard';
import { doNotBackGuard } from '../shared/sharedGuards/do-not-back.guard';

export const routes: Routes = [
    {path: '', redirectTo:"/Login", pathMatch:'full'},
    {
        path: 'Login',
        loadComponent: () => import('../Features/login/login.component').then((c) =>c.LoginComponent),
    },
    {
      path: 'Register',
      loadComponent: () => import('../Features/register/register.component').then((c) =>c.RegisterComponent),
    },
    {
      path: 'LogedIn',
      loadComponent: () => import('../Features/posts-component/posts-component.component').then((c) =>c.PostsComponentComponent),
      // canActivate:[authGuard],
      // canDeactivate:[doNotBackGuard]
    },
];  

