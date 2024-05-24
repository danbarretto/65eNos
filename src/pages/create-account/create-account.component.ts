import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class CreateAccountComponent implements OnInit {
  name: string = ''
  lastName: string = ''
  email: string = ''
  password: string = ''
  confirmEmail: string = ''
  confirmPassword: string = ''
  showPassword = false
  showConfirmPassword = false

  constructor() { }

  ngOnInit() {
  }

  togglePassword(field:'confirm'|'password'){
    if (field === 'confirm'){
      this.showConfirmPassword = !this.showConfirmPassword
      return
    }
    this.showPassword = !this.showPassword 
  }
}
