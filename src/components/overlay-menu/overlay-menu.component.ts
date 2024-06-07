import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { AuthenticationService, UserModel } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'
import { MatDrawer, MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { ToggleMenuService } from '../../services/toggle-menu.service';

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
  imports: [MaterialModule]
})
export class OverlayMenuComponent implements OnInit, OnDestroy {

  currentUser: UserModel
  userFullName = 'Usuário'

  topics: string[] = ["Bem-estar", "Saúde", "Social", "Dicas"]
  links: MenuLink[] = [
    { label: "Sobre nós", icon: "information", route: "about" },
    { label: "Contato", icon: "contact_page", route: "contact" },
    { label: "Ajuda", icon: "help", route: "help" },
  ]
  userSub: Subscription;

  constructor(private authService: AuthenticationService, private router: Router, private toggleMenu: ToggleMenuService) {

  }

  close(){
    this.toggleMenu.toggleMenu()
  }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.currentUser = user
      this.userFullName = this.currentUser?.getFullName()
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
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

}
