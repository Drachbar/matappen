import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthStateService} from "../../services/auth-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  constructor(private httpClient: HttpClient, private authState: AuthStateService, private router: Router) {
  }

  logout() {
    this.httpClient.post('api/v1/logout', {}, {withCredentials: true}).subscribe({
      next: _ => {
        this.authState.setLoggedIn(false);
        this.router.navigate(['/'])
      },
      error: (error) => console.error('Failure:', error)
    })
  }
}
