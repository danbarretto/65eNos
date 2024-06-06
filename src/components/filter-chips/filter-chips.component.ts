import { Component, OnInit } from '@angular/core';
import { Category, NewsService } from '../../services/news.service'
import { MaterialModule } from '../../app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class FilterChipsComponent implements OnInit {

  categories: Category[] = ['bem-estar', 'saúde', 'social', 'dicas']
  currentCat: Category
  constructor(private newsService: NewsService) {
    this.newsService.getSortedByPublicationDate()
      }

  ngOnInit() {
  }

  filterByCategory(category: Category) {
    if (this.currentCat === category) {
      this.newsService.clearCategory()
      this.currentCat = undefined
      // this.newsService.getSortedByPublicationDate()
      return
    }
    this.currentCat = category
    this.newsService.filterByCategory(category)    
    // this.newsService.getSortedByPublicationDate()
  }

}
