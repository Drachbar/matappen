import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  formGetUser = {
    email: '',
  };
  formRegisterUser = {
    name: '',
    email: '',
    password: ''
  };
  loginData: LoginData = { username: '', password: '' };

  constructor(private http: HttpClient) {
  }

  getUserByEmail() {
    this.http.get(`/api/v1/getUserByEmail?email=${this.formGetUser.email}`).subscribe({
      next: (response) => console.log('Data skickades!', response),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }

  registerUser() {
    this.http.post('api/v1/register', this.formRegisterUser).subscribe({
      next: (response) => console.log('Data skickades!', response),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      const formData = new FormData();
      formData.append('username', this.loginData.username);
      formData.append('password', this.loginData.password);

      this.http.post('/api/v1/login', formData, {withCredentials: true}).subscribe({
        next: (response) => console.log('Success:', response),
        error: (error) => console.error('Failure:', error)
      });
    }
  }

  testAuth() {
    this.http.get('api/v1/testAuthentication').subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Failure:', error)
    });
  }
}
