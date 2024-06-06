import { Component, OnInit, Input } from '@angular/core';
//import {Component} from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { NewsArticle } from '../../services/news.service';
import { Router } from '@angular/router';

export enum AudioState {
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

  @Input() news: NewsArticle;

  State = AudioState
  audioState: AudioState = AudioState.Initial;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleAudioState() {
    if (this.audioState === AudioState.Initial || this.audioState === AudioState.Pause) {
      this.audioState = AudioState.Play;
    } else {
      this.audioState = AudioState.Pause;
    }
  }

  openArticle() {
    this.router.navigateByUrl(`noticias/${this.news.id}`, { skipLocationChange: true })
  }

}
