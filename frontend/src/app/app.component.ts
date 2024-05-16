import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RouterLink, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Mattias matblogg';

  formGetUser = {
    email: '',
  };

  constructor(private http: HttpClient) {
  }

  getUserByEmail() {
    this.http.get(`/api/v1/getUserByEmail?email=${this.formGetUser.email}`).subscribe({
      next: (response) => console.log('Data skickades!', response),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }

  testAuth() {
    this.http.get('api/v1/testAuthentication', {responseType: 'text'}).subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Failure:', error)
    });
  }
}
