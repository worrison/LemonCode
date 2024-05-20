import { Routes } from '@angular/router';
/**Publicas */
import { HomeComponent } from './public/pages/home/home.component';
import { AcercaDeComponent } from './public/pages/acerca-de/acerca-de.component';
import { LoginComponent } from './public/pages/login/login.component';
/**Privadas */
import { DashboardComponent } from './private/pages/dashboard/dashboard.component';
import { CrudComponent } from './private/pages/crud/crud.component';
import { GaleriaComponent } from './private/pages/galeria/galeria.component';
import { ProfileComponent } from './private/pages/profile/profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'acerca', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crud', component: CrudComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'profile', component: ProfileComponent },

];
