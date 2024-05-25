import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';

class CustomValidators {
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
}

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  
  private readonly _emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  private readonly _passwordFormControl: FormControl = new FormControl('', [Validators.required, CustomValidators.password]);
  
  public get emailFormControl(): FormControl {
    return this._emailFormControl;
  }
  
  public get passwordFormControl(): FormControl {
    return this._passwordFormControl;
  }

  isEqual(field1: string, field2: string): boolean {
    return field1 === field2;
  }
}
