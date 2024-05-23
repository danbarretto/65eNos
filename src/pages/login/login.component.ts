import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [HttpClientModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {


  email: string = ''
  password: string = ''
  showPassword = false

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  createAccount() {
    this.router.navigateByUrl('account/create')
  }

}
