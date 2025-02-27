import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private _isLoggedIn = signal<boolean>(false);

  get isLoggedIn() {
    return this._isLoggedIn.asReadonly();
  }

  setLoggedIn(status: boolean) {
    this._isLoggedIn.set(status);
  }
}
