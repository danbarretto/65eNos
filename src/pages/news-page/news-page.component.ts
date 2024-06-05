import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { ActivatedRoute } from '@angular/router';
import { NewsArticle, NewsService } from '../../services/news.service';
import { TopAppBarComponent } from '../../components/top-app-bar/top-app-bar.component';
import { ViewportScroller } from '@angular/common';
import { ScrollTopButtonComponent } from '../../components/scroll-top-button/scroll-top-button.component';
import { HttpClientModule } from '@angular/common/http';
import { AudioState } from '../../components/card-news/card-news.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { FontSizeService } from '../../services/font-size.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  standalone: true,
  imports: [MaterialModule, TopAppBarComponent, ScrollTopButtonComponent, HttpClientModule, CommentSectionComponent]
})
export class NewsPageComponent implements OnInit {

  id: string = '1'
  article: NewsArticle
  audioState: AudioState = AudioState.Initial
  State = AudioState

  constructor(private route: ActivatedRoute, private newsService: NewsService,
    private fontSizeService: FontSizeService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.article = this.newsService.getNewsArticle(this.id)
  }


}
