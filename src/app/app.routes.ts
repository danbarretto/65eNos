import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { NewsPageComponent } from '../pages/news-page/news-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'noticias/:id', component: NewsPageComponent }
];

