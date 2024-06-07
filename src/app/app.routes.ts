import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { CreateAccountComponent } from '../pages/create-account/create-account.component';
import { NewsPageComponent } from '../pages/news-page/news-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '65eNos', component: HomeComponent },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/create', component: CreateAccountComponent },
    { path: 'noticias/:id', component: NewsPageComponent }
];

