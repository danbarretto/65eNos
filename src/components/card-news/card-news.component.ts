import { Component, OnInit } from '@angular/core';
//import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CardNewsComponent],
})
export class CardNewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
