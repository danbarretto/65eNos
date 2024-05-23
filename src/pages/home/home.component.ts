import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { CardNewsComponent } from '../../components/card-news/card-news.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MaterialModule, CardNewsComponent],
  standalone: true
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
