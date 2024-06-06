import { Component, OnInit, Renderer2 } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { TopAppBarComponent } from '../../components/top-app-bar/top-app-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NewsArticle, NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { GridOfNewsComponent } from '../../components/grid-of-news/grid-of-news.component';
import { FilterChipsComponent } from '../../components/filter-chips/filter-chips.component';
import { Observable } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ScrollTopButtonComponent } from '../../components/scroll-top-button/scroll-top-button.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MaterialModule,
    TopAppBarComponent,
    FooterComponent,
    GridOfNewsComponent,
    FilterChipsComponent,
    SearchBarComponent,
    ScrollTopButtonComponent],
  standalone: true
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }



  goToArticle(article: NewsArticle) {
    this.router.navigateByUrl(`noticias/${article.id}`)
  }



}
