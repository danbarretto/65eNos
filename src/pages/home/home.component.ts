import { Component } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { TopAppBarComponent } from '../../components/top-app-bar/top-app-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NewsArticle } from '../../services/news.service';
import { Router } from '@angular/router';
import { GridOfNewsComponent } from '../../components/grid-of-news/grid-of-news.component';
import { FilterChipsComponent } from '../../components/filter-chips/filter-chips.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { OverlayMenuComponent } from '../../components/overlay-menu/overlay-menu.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MaterialModule, TopAppBarComponent, FooterComponent, GridOfNewsComponent, FilterChipsComponent, SearchBarComponent, OverlayMenuComponent],
  standalone: true
})
export class HomeComponent {

  constructor(private router: Router) {

  }

  goToArticle(article: NewsArticle) {
    this.router.navigateByUrl(`noticias/${article.id}`)
  }

}
