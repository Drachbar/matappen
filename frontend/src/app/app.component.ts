import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UpperCasePipe} from "@angular/common";
import {NavComponent} from "./components/nav/nav.component";
import {AuthStateService} from "./services/auth-state.service";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, UpperCasePipe, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Mattias matblogg';

  formGetUser = {
    email: '',
  };

  constructor(private http: HttpClient, private authState: AuthStateService) {
  }

  ngOnInit(): void {
    this.testAuth()
  }

  getUserByEmail() {
    this.http.get(`/api/v1/getUserByEmail?email=${this.formGetUser.email}`).subscribe({
      next: (response) => console.log('Data skickades!', response),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }

  testAuth() {
    this.http.get('api/v1/testAuthentication', {responseType: 'text'}).subscribe({
      next: _ => {
        this.authState.setLoggedIn(true)
      },
      error: _ => {
        this.authState.setLoggedIn(false)
      }
    });
  }
}
