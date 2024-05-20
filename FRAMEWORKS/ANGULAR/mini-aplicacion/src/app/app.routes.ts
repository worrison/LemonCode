import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { AcercaDeComponent } from './public/pages/acerca-de/acerca-de.component';
import { LoginComponent } from './public/pages/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'acerca', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent },

];
