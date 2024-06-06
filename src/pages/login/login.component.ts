import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {


  email: string = ''
  password: string = ''
  errorMessage: string = ''
  showPassword = false

  constructor(private router: Router, private authService: AuthenticationService) {
    
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
