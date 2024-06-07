import { Component, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontSizeService } from '../../services/font-size.service';
import { Router } from '@angular/router';
@Component({
  selector: 'top-app-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './top-app-bar.component.html',
  styleUrl: './top-app-bar.component.scss'
})
export class TopAppBarComponent {

  currentTheme = 'light-theme';
  tooltip = 'Aplicar Tema Escuro'

  constructor(private renderer: Renderer2, private fontSizeService: FontSizeService,
    private router: Router
  ) {
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


  increaseFontSize() {
    this.fontSizeService.increaseFontSize();

  }

  goHome() {
    this.router.navigateByUrl('/')
  }

}
