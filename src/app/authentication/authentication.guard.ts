import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { HidaUiService } from '../services/hida-ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private hidaUiService: HidaUiService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  getRedirectUrl(url: string): string {
    return url +
      (sessionStorage.getItem('redirectUrl')
        ? sessionStorage.getItem('redirectUrl') : '');
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()) {
      this.hidaUiService.rolesObject$.next(this.authService.getUserInfo());
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.setRedirectUrl(this.getRedirectUrl(url));

    // Navigate to the login or ping page with extras
    url.includes('ping')
      ? this.router.navigate(['/ping-login'])
      : this.router.navigate(['/login']);
    return false;
  }
}
