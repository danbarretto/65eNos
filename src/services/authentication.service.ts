import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs'

export class CustomValidators {
  /**
   * @description Validator for password.
   *   
   * @returns An error map that contains one of the properties listed below or null if it is valid:
   * - minLength  : at least 10 characters
   * - lowerCase  : at least one lowercase character
   * - upperCase  : at least one uppercase character
   * - digit      : at least one digit
   * - specialChar: at least one special character (!@#$%&*)
   */
  static password(control: AbstractControl<string>): ValidationErrors | null {
    const value = control.value
    const minLength = 10;
    const lowerCaseRegex = /^(?=.*[a-z])/;
    const upperCaseRegex = /^(?=.*[A-Z])/;
    const digitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[!@#$%&*])/;

    const validationErrors: ValidationErrors = {};
    if (!value) {
      return null;
    }
    if (value.length < minLength) {
      validationErrors["minLength"] = { minLength: minLength, actual: value.length }
    }
    if (!lowerCaseRegex.test(value)) {
      validationErrors["lowerCase"] = { lowerCase: false }
    }
    if (!upperCaseRegex.test(value)) {
      validationErrors["upperCase"] = { upperCase: false }
    }
    if (!digitRegex.test(value)) {
      validationErrors["digit"] = { digit: false }
    }
    if (!specialCharRegex.test(value)) {
      validationErrors["specialChar"] = { specialChar: false }
    }

    return Object.is(validationErrors, {}) ? null : validationErrors;
  }

  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}

export class UserModel {
  name: string;
  lastName: string;
  email: string;
  password: string;

  constructor(_name: string, lastName: string, email: string, password: string) {
    this.name = _name
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  getFullName(): string {
    return this.name + ' ' + this.lastName;
  }

  isValid(): boolean {
    return this.name.length > 0 &&
      this.lastName.length > 0 &&
      this.email.length > 0 &&
      this.password.length > 0;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  validAccounts: UserModel[] = [new UserModel('Admin', 'Nistrator', 'adm@adm', '123')];

  private currentUser: UserModel = undefined;
  private _user$ = new BehaviorSubject<UserModel>(undefined)
  public get user$() {
    return this._user$.asObservable()
  }

  constructor(private router: Router) {

  }

  createAccount(user: UserModel): void {
    if (!user.isValid()) {
      return;
    }

    console.log('created account:', user.getFullName())

    this.validAccounts.push(user);
    this.login(user.email, user.password);
  }

  login(email: string, password: string): boolean {
    if (this.currentUser !== undefined) {
      this.router.navigateByUrl('/');
      console.log('logging in as: %s', this.currentUser.getFullName());
      return true;
    }

    this.currentUser = this.validAccounts.find(user => user.email === email && user.password === password);

    if (this.currentUser !== undefined) {
      this.router.navigateByUrl('/');
      console.log('logging in as: %s', this.currentUser.getFullName());
    }
    this._user$.next(this.currentUser)
    return !!this.currentUser;
  }

  logOut(): void {
    this.currentUser = undefined;
    this._user$.next(this.currentUser)
    this.router.navigateByUrl('/')
  }

  getCurrentUser(): UserModel {
    return this.currentUser;
  }
}
