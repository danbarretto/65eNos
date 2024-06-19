/* eslint-disable @angular-eslint/component-selector */
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService, CustomValidators, UserModel } from '../../services/authentication.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { TopAppBarComponent } from "../../components/top-app-bar/top-app-bar.component";
import { OverlayMenuComponent } from "../../components/overlay-menu/overlay-menu.component";
import { MatSidenav } from '@angular/material/sidenav';
import { ScrollTopButtonComponent } from "../../components/scroll-top-button/scroll-top-button.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ToggleMenuService } from '../../services/toggle-menu.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class ConfirmValidParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted)) || (control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched || isSubmitted));
  }
}

@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
    standalone: true,
    imports: [MaterialModule, FormsModule, ReactiveFormsModule, TopAppBarComponent, OverlayMenuComponent, MatSidenav, ScrollTopButtonComponent, FooterComponent]
})
export class CreateAccountComponent {

  @ViewChild('sidenav') sidenav: MatSidenav

  showPassword = false
  showConfirmPassword = false

  errorMatcher = new CustomErrorStateMatcher();
  confirmErrorMatcher = new ConfirmValidParentErrorStateMatcher();
  createAccountForm: FormGroup;

  nameControl: FormControl;
  lastNameControl: FormControl;

  emailGroup: FormGroup;
  emailControl: FormControl;
  confirmEmailControl: FormControl;

  passwordGroup: FormGroup;
  passwordControl: FormControl;
  confirmPasswordControl: FormControl;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private toggleMenu: ToggleMenuService) {
    this.buildForm();
    this.toggleMenu.toggle$.subscribe(() => {
      this.sidenav.toggle()
    })
  }

  private buildForm() {
    this.createAccountForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, { validators: CustomValidators.childrenEqual }),

      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, CustomValidators.password]],
        confirmPassword: ['', [Validators.required]],
      }, { validators: CustomValidators.childrenEqual }),
    });

    this.createAccountForm.updateValueAndValidity();

    this.nameControl = this.createAccountForm.get("name") as FormControl;
    this.lastNameControl = this.createAccountForm.get("lastName") as FormControl;

    this.emailGroup = this.createAccountForm.get("emailGroup") as FormGroup;
    this.emailControl = this.createAccountForm.get(["emailGroup", "email"]) as FormControl;
    this.confirmEmailControl = this.createAccountForm.get(["emailGroup", "confirmEmail"]) as FormControl;

    this.passwordGroup = this.createAccountForm.get("passwordGroup") as FormGroup;
    this.passwordControl = this.createAccountForm.get(["passwordGroup", "password"]) as FormControl;
    this.confirmPasswordControl = this.createAccountForm.get(["passwordGroup", "confirmPassword"]) as FormControl;
  }

  createAccount(): void {
    if (this.createAccountForm.invalid) {
      return;
    }

    const user: UserModel = new UserModel(this.nameControl.value, this.lastNameControl.value, this.emailControl.value, this.passwordControl.value);


    this.authService.createAccount(user);
  }

  togglePassword(field: 'confirm' | 'password') {
    if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword
      return
    }
    this.showPassword = !this.showPassword
  }
}
