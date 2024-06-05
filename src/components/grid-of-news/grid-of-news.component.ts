import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../app/material.module';
import { MatCardModule } from '@angular/material/card';
import { CardNewsComponent } from '../card-news/card-news.component';
import { Dir } from '@angular/cdk/bidi';
import { NewsArticle, NewsService } from '../../services/news.service';


@Component({
  selector: 'app-grid-of-news',
  templateUrl: './grid-of-news.component.html',
  styleUrls: ['./grid-of-news.component.scss'],
  standalone: true,
  imports: [MaterialModule, CardNewsComponent]
})
export class GridOfNewsComponent implements OnInit {


  newsList: NewsArticle[] = []

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsList = this.newsService.getArticles()
  }

}
