import { Component, OnInit, Input} from '@angular/core';
//import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from '../../app/material.module';
import {MatCardModule} from '@angular/material/card';
import { GridOfNewsComponent, NewsDto } from '../grid-of-news/grid-of-news.component';

export enum AudioState{
  Initial = 0,
  Pause = 1, 
  Play = 2
}

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  standalone: true,
  imports: [MaterialModule],
})



export class CardNewsComponent implements OnInit {

@Input() news: NewsDto;

State = AudioState
audioState: AudioState = AudioState.Initial;


  constructor() { }

  ngOnInit() {
  }
  toggleAudioState() {
    if (this.audioState === AudioState.Initial || this.audioState === AudioState.Pause) {
      this.audioState = AudioState.Play;
    } else {
      this.audioState = AudioState.Pause;
    }
  }

}
