import { Injectable } from '@angular/core';
import { CanActivate, Router,Routes } from '@angular/router'
/**Publicas */
import { HomeComponent } from './public/pages/home/home.component';
import { AcercaDeComponent } from './public/pages/acerca-de/acerca-de.component';
import { LoginComponent } from './public/pages/login/login.component';
/**Privadas */
import { DashboardComponent } from './private/pages/dashboard/dashboard.component';
import { CrudComponent } from './private/pages/crud/crud.component';
import { GaleriaComponent } from './private/pages/galeria/galeria.component';
import { ProfileComponent } from './private/pages/profile/profile.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent ,  canActivate: [NoAuthGuard] },
  { path: 'home', component: HomeComponent,  canActivate: [NoAuthGuard] },
  { path: 'acerca', component: AcercaDeComponent,  canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent,  canActivate: [NoAuthGuard] },
  { path: 'crud', component: CrudComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'galeria', component: GaleriaComponent ,canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]},
];
