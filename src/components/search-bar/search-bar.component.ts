import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule]
})
export class SearchBarComponent implements OnInit {

  searchQuery = ''

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  search() {
    this.newsService.searchArticle(this.searchQuery)
  }

}
