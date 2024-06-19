import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsArticle, NewsService } from '../../services/news.service';
import { TopAppBarComponent } from '../../components/top-app-bar/top-app-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollTopButtonComponent } from '../../components/scroll-top-button/scroll-top-button.component';
import { HttpClientModule } from '@angular/common/http';
import { AudioState } from '../../components/card-news/card-news.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { FontSizeService } from '../../services/font-size.service';
import { AuthenticationService, UserModel } from '../../services/authentication.service';
import { OverlayMenuComponent } from "../../components/overlay-menu/overlay-menu.component";
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.scss'],
    standalone: true,
    imports: [MaterialModule, TopAppBarComponent, FooterComponent, ScrollTopButtonComponent, HttpClientModule, CommentSectionComponent, OverlayMenuComponent]
})
export class NewsPageComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav
  
  id: string = '1'
  article: NewsArticle
  audioState: AudioState = AudioState.Initial
  State = AudioState
  currentUser: UserModel


  constructor(private route: ActivatedRoute, private newsService: NewsService,
    private fontSizeService: FontSizeService, private authService: AuthenticationService,
    private router: Router, private toggleMenu: ToggleMenuService, private scroll: ViewportScroller
  ) {
    this.toggleMenu.toggle$.subscribe(() => {
      this.sidenav.toggle()
    })
    this.router.events.subscribe(() => this.updateNewsArticle());
  }

  ngOnInit() {
    this.updateNewsArticle();
  }

  updateNewsArticle() {
    document.body.scrollTop = 0;
    this.scroll.scrollToPosition([0,0])
    this.id = this.route.snapshot.paramMap.get('id')
    this.article = this.newsService.getNewsArticle(this.id)
  }

  navigateHome() {
    this.router.navigateByUrl('')
  }

}
