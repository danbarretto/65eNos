import { Component, OnInit, Renderer2} from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { TopAppBarComponent } from '../../components/top-app-bar/top-app-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NewsArticle, NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { GridOfNewsComponent } from '../../components/grid-of-news/grid-of-news.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MaterialModule, TopAppBarComponent,FooterComponent, GridOfNewsComponent],
  standalone: true
})
export class HomeComponent implements OnInit {

  articles: NewsArticle[]
  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.articles = this.newsService.getArticles()
  }



  goToArticle(article: NewsArticle) {
    this.router.navigateByUrl(`noticias/${article.id}`)
  }

  

}
