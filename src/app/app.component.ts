import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCheckbox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '65eNos';
}
