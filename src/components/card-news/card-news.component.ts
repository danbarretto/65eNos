import { Component, OnInit } from '@angular/core';
//import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from '../../app/material.module';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  standalone: true,
  imports: [MaterialModule],
})
export class CardNewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
