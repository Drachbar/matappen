import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthStateService} from "../../services/auth-state.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    FormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  authState = inject(AuthStateService);
  searchQuery: string = '';

  constructor(private router: Router) {
  }

  performSearch() {
    console.log(this.searchQuery)

    if (this.searchQuery) {
      this.router.navigate(['recipe/search-recipe'], {queryParams: {search: this.searchQuery}});
    }
  }
}
