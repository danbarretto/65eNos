import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { AuthenticationService, UserModel } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { AcessibilityToolbarComponent } from '../acessibility-toolbar/acessibility-toolbar.component';

interface MenuLink {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss'],
  standalone: true,
  imports: [MaterialModule, AcessibilityToolbarComponent]
})
export class OverlayMenuComponent implements OnInit, OnDestroy {

  currentUser: UserModel
  userFullName = 'Usuário'
  showAcessibility = false

  topics: string[] = ["Bem-estar", "Saúde", "Social", "Alimentação"]
  links: MenuLink[] = [
    { label: "Sobre nós", icon: "information", route: "" },
    { label: "Contato", icon: "contact_page", route: "" },
    { label: "Ajuda", icon: "help", route: "noticias/1" },
  ]
  userSub: Subscription;

  constructor(private authService: AuthenticationService, private router: Router, private toggleMenu: ToggleMenuService) {

  }

  close() {
    this.toggleMenu.toggleMenu()
  }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.currentUser = user
      this.userFullName = this.currentUser?.getFullName()
    })


    let mediaQuery = window.matchMedia("(max-width: 600px)")
    this.checkShowOrHideAcessibility(mediaQuery)
    mediaQuery.addEventListener('change', (query) => this.checkShowOrHideAcessibility(query))
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  checkShowOrHideAcessibility(query: MediaQueryListEvent | MediaQueryList) {
    this.showAcessibility = query.matches
  }

  loginIn(): void {
    this.router.navigateByUrl("account/login");
  }

  createAccount(): void {
    this.router.navigateByUrl("account/create");
  }

  logOut(): void {
    this.authService.logOut();
  }

  navigateTo(path: string): void {
    if (path) {
      this.router.navigateByUrl(path);
    }
  }
}
