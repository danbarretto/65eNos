import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class ScrollTopButtonComponent {

  constructor(private scroll: ViewportScroller) { }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0])
    document.body.scrollTop = 0;

  }

}
