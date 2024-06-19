import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { TopAppBarComponent } from "../../components/top-app-bar/top-app-bar.component";
import { OverlayMenuComponent } from "../../components/overlay-menu/overlay-menu.component";
import { ToggleMenuService } from '../../services/toggle-menu.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ScrollTopButtonComponent } from "../../components/scroll-top-button/scroll-top-button.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [MaterialModule, FormsModule, ReactiveFormsModule, TopAppBarComponent, OverlayMenuComponent, ScrollTopButtonComponent, FooterComponent]
})
export class LoginComponent {

  @ViewChild('sidenav') sidenav: MatSidenav

  email: string = ''
  password: string = ''
  errorMessage: string = ''
  showPassword = false

  constructor(private router: Router, private authService: AuthenticationService, private toggleMenu: ToggleMenuService) {
    this.toggleMenu.toggle$.subscribe(() => {
      this.sidenav.toggle()
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  createAccount() {
    this.router.navigateByUrl('account/create')
  }

  login() {
    this.errorMessage = this.authService.login(this.email, this.password) ? "" : "Email ou senha incorretos.";
  }

}
