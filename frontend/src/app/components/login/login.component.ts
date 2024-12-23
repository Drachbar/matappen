import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) {
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      const formData = new FormData();
      formData.append('username', this.loginData.username);
      formData.append('password', this.loginData.password);

      this.http.post('/api/v1/login', formData, {
        withCredentials: true,
        responseType: 'text'
      }).subscribe({
        next: (response) => console.log('Success:', response),
        error: (error) => console.error('Failure:', error)
      });
    }
  }
}
