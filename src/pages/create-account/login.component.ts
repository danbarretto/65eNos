import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor() {
  }

  ngOnInit() {
  }

}
