// ng generate service font-size
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {
  private fontSizeClass = 'medium-font';
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.applyFontSize(this.fontSizeClass);
  }

  private applyFontSize(fontSizeClass: string) {
    const htmlElement = document.documentElement;
    this.renderer.removeClass(htmlElement, 'small-font');
    this.renderer.removeClass(htmlElement, 'medium-font');
    this.renderer.removeClass(htmlElement, 'large-font');
    this.renderer.removeClass(htmlElement, 'extra-large-font');
    this.renderer.addClass(htmlElement, fontSizeClass);
  }

  increaseFontSize() {
    if (this.fontSizeClass === 'small-font') {
      this.fontSizeClass = 'medium-font';
    } else if (this.fontSizeClass === 'medium-font') {
      this.fontSizeClass = 'large-font';
    } else if (this.fontSizeClass === 'large-font') {
      this.fontSizeClass = 'extra-large-font';
    }
    this.applyFontSize(this.fontSizeClass);
  }

  decreaseFontSize() {
    if (this.fontSizeClass === 'extra-large-font') {
      this.fontSizeClass = 'large-font';
    } else if (this.fontSizeClass === 'large-font') {
      this.fontSizeClass = 'medium-font';
    } else if (this.fontSizeClass === 'medium-font') {
      this.fontSizeClass = 'small-font';
    }
    this.applyFontSize(this.fontSizeClass);
  }
}
