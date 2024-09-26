import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MenuPageComponent } from './components/pages/menu-page/menu-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { RestaurantPageComponent } from './components/pages/restaurant-page/restaurant-page.component';
import { UserGuard } from '../auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'restaurant', component: RestaurantPageComponent, canActivate: [UserGuard] },
  { path: 'restaurant/:id', component: MenuPageComponent, canActivate: [UserGuard] },
  { path: 'restaurant/search/:searchTerm', component: RestaurantPageComponent, canActivate: [UserGuard] }
];
