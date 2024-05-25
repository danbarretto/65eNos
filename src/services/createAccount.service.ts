import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  private passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&?]).{10,}$/;
  
  private readonly _emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  private readonly _passwordFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(this.passwordRegex)]);
  
  public get emailFormControl(): FormControl {
    return this._emailFormControl;
  }
  
  public get passwordFormControl(): FormControl {
    return this._passwordFormControl;
  }
  
  constructor() { }

  isEqual(field1: string, field2: string): boolean {
    return field1 === field2;
  }
}
