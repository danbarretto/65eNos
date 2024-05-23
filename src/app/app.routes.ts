import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/create-account/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'account/login', component: LoginComponent }
];

