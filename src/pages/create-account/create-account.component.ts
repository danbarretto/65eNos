/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountService } from '../../services/createAccount.service';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class CreateAccountComponent {
  name: string = ''
  lastName: string = ''
  email: string = ''
  password: string = ''
  confirmEmail: string = ''
  confirmPassword: string = ''
  showPassword = false
  showConfirmPassword = false
  
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(private createAccService: CreateAccountService) { 
    this.emailFormControl = createAccService.emailFormControl;
    this.passwordFormControl = createAccService.passwordFormControl;
  }

  printErrors() {
    console.log(this.passwordFormControl.errors);
  }
  
  isConfirmEmailEqual(): boolean {
      return this.createAccService.isEqual(this.email, this.confirmEmail)
  }

  isConfirmPasswordEqual(): boolean {
      return this.createAccService.isEqual(this.password, this.confirmPassword)
  }

  togglePassword(field:'confirm'|'password'){
    if (field === 'confirm'){
      this.showConfirmPassword = !this.showConfirmPassword
      return
    }
    this.showPassword = !this.showPassword 
  }
}
