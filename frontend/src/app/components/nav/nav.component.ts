import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthStateService} from "../../services/auth-state.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  authState = inject(AuthStateService);
}
