import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontSizeService } from '../../services/font-size.service';
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { Router } from '@angular/router';
import { AcessibilityToolbarComponent } from '../acessibility-toolbar/acessibility-toolbar.component';
@Component({
  selector: 'top-app-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, AcessibilityToolbarComponent],
  templateUrl: './top-app-bar.component.html',
  styleUrl: './top-app-bar.component.scss',
})
export class TopAppBarComponent implements OnInit {

  showAcessibility = false

  constructor(private toggleService: ToggleMenuService, private router: Router, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    let mediaQuery = window.matchMedia("(max-width: 600px)")
    this.checkShowOrHideAcessibility(mediaQuery)
    mediaQuery.addEventListener('change', (query) => this.checkShowOrHideAcessibility(query))
  }

  checkShowOrHideAcessibility(query: MediaQueryListEvent | MediaQueryList) {
    this.showAcessibility = !query.matches
  }

  toggleMenu() {
    this.toggleService.toggleMenu()
  }

  goHome() {
    this.router.navigateByUrl('/')
  }

}
