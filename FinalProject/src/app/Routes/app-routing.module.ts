import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

