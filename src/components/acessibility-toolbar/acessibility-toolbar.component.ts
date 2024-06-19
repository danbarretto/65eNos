import { Component, OnInit, Renderer2 } from '@angular/core';
import { FontSizeService } from '../../services/font-size.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../app/material.module';

@Component({
  selector: 'acessibility-toolbar',
  templateUrl: './acessibility-toolbar.component.html',
  styleUrls: ['./acessibility-toolbar.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class AcessibilityToolbarComponent implements OnInit {


  currentTheme = 'light-theme';
  tooltip = 'Aplicar Tema Escuro'

  constructor(private renderer: Renderer2, private fontSizeService: FontSizeService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  toggleContrast() {
    if (this.currentTheme === 'light-theme') {
      this.currentTheme = 'dark-theme';
      this.tooltip = 'Aplicar Tema Claro'
    } else {
      this.currentTheme = 'light-theme';
      this.tooltip = 'Aplicar Tema Escuro'
    }
    this.applyTheme(this.currentTheme);
  }

  applyTheme(theme: string) {
    const previousTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.renderer.removeClass(document.body, previousTheme);
    this.renderer.addClass(document.body, theme);
  }

  decreaseFontSize() {
    this.fontSizeService.decreaseFontSize();

  }

  openHelp() {
    this.router.navigateByUrl('noticias/1')
  }

  increaseFontSize() {
    this.fontSizeService.increaseFontSize();
  }
}
