import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { Config } from './config';
import { BehaviorSubject } from 'rxjs';
import { AppConfig } from '../config/app_config';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiConfig: any;
  redirectUrl = '';
  apiToken: any;

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    this.apiConfig = new Config().getConfig();
  }

  getTenantApiTokenKey(): string {
    return [AppConfig.tenantId, 'api-token'].join('-');
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.getTenantApiTokenKey());
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.getTenantApiTokenKey()) !== null;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl || '';
  }

  getUserName(): string {
    const jwtToken = localStorage.getItem(this.getTenantApiTokenKey());
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      return decodedToken['username'];
    }
    return '';
  }

  getUserEmail(): string {
    const jwtToken = localStorage.getItem(this.getTenantApiTokenKey());
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      return decodedToken['email'];
    }
    return '';
  }

  public getClientId(): string {
    const jwtToken = localStorage.getItem(this.getTenantApiTokenKey());
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      return decodedToken['clientId'];
    }
    return '';
  }

  getUserInfo(): { roles: string[], clientId: string } {
    return {
      roles: this.getUserRole(),
      clientId: this.getClientId()
    };
  }

  public getCompanyName(): string {
    const jwtToken = localStorage.getItem(this.getTenantApiTokenKey());
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      return decodedToken['company'];
    }
    return '';
  }

  parseUserRole(roles: string[]): string {
    if (roles === null || roles === undefined || roles.length === 0) {
      return '';
    }
    if (roles.some(role => role.toLowerCase() === 'distributor')) {
      return 'DISTRIBUTOR';
    } else if (roles.some(role => role.toLowerCase() === 'manufacturer')) {
      return 'MANUFACTURER';
    } else {
      return '';
    }
  }

  public authenticate(token: any): void {
    if (token) {
      localStorage.setItem(this.getTenantApiTokenKey(), token);
      this.isUserLoggedIn.next(true);
    }
  }

  public getUserRole(): string[] {
    const jwtToken = localStorage.getItem(this.getTenantApiTokenKey());
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      const roles = decodedToken['roles'];
      return roles && roles.length > 0 ? roles : [];
    }
    return [];
  }

  public checkUserHasRole(roleType: string): boolean {
    return this.getUserRole().some(role => role.toLowerCase() === roleType.toLowerCase());
  }

  public getRoles(): any {
    const jwtToken = localStorage.getItem(this.getTentantApiTokenKey());
    if (jwtToken) {
      const decodedToken: any = jwt_decode(jwtToken);
      return decodedToken['roles'];
    }
    return '';
  }

  getTentantApiTokenKey(): string {
    return this.apiConfig.tenantId + '-api-token';
  }

  public login(): boolean {
    this.signOut();
    const url =
      this.apiConfig.apiUrl +
      this.apiConfig.endPoints.login +
      // '?tenantId=HIDA' +
      '?tenantId=' + AppConfig.tenantId +
      '&redirectTo=' +
      this.getRedirectUrl();
    this.redirect(url); // Redirect user to login page
    // this.redirect('http://localhost:8080/HidaApiGateway/login?redirectTo=/dashboard');
    return false;
  }

  public ping(): boolean {
    this.signOut();
    const url =
      this.apiConfig.apiUrl +
      this.apiConfig.endPoints.ping +
      '?tenantId=' + AppConfig.tenantId +
      '&redirectTo=' +
      this.getRedirectUrl();
    this.redirect(url); // Redirect user to ping endpoint
    return false;
  }

  public logout(): boolean {
    const url =
      this.apiConfig.apiUrl +
      this.apiConfig.endPoints.logout +
      '?tenantId=' + AppConfig.tenantId +
      '&api_token=' +
      localStorage.getItem(this.getTenantApiTokenKey());
    this.signOut();
    this.redirect(url); // Redirect user to logout page
    return false;
  }

  redirect(url: string): void {
    window.location.replace(url);
  }

  signOut(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
