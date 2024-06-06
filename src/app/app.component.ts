import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '65eNos';

  constructor() {
  }

}
