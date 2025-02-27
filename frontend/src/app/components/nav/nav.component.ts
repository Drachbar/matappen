import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthStateService } from "../../services/auth-state.service";
import { FormsModule } from "@angular/forms";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-nav",
  imports: [RouterLink, RouterLinkActive, FormsModule, NgbCollapseModule],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent {
  isCollapsed = true;

  authState = inject(AuthStateService);
  searchQuery: string = "";

  constructor(private router: Router) {}

  performSearch() {
    console.log(this.searchQuery);

    if (this.searchQuery) {
      this.router.navigate(["recipe/search-recipe"], {
        queryParams: { search: this.searchQuery },
      });
    }
  }
}
