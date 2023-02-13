import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  buildQueryParams(): void {
    if (this.authService.redirectUrl === '' && sessionStorage.getItem('redirectUrl')) {
      this.authService.redirectUrl = '/' + sessionStorage.getItem('redirectUrl');
    }
  }

  login(): void {
    this.buildQueryParams();
    this.authService.login();
  }

  getNavigationUrl(redirect: string): any {
    // Redirect parameters are separated by ' '
    //  First parameter space has to be replaced by ? followed by & for each space
    const redirectUrl = decodeURIComponent(redirect).split(' ');
    return decodeURIComponent(redirectUrl.shift() + '?' + redirectUrl.join('&'));
  }

  consume(apiToken: any): void {
    const redirect = this.authService.redirectUrl
      ? this.authService.redirectUrl : '';
    this.authService.authenticate(apiToken);
    this.authService.getUserRole();
    this.router.navigateByUrl(this.getNavigationUrl(redirect));
  }

  consumePing(apiToken: any): void {
    const redirect = this.authService.redirectUrl
      ? this.authService.redirectUrl
      : '';
    this.authService.authenticate(apiToken);
    this.authService.getUserRole();
    this.router.navigateByUrl(this.getNavigationUrl(redirect));
  }

  trackLogout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }

  async logout(): Promise<void> {
    try {
      await this.trackLogout();
      this.authService.logout();
    }
    catch (errors) {
      console.log(errors);
      this.authService.logout();
    }
  }

  validRoute(): string {
    if (this.route && this.route.snapshot && this.route.snapshot.routeConfig && this.route.snapshot.routeConfig.path) {
      return this.route.snapshot.routeConfig.path;
    }
    return '/';
  }

  ngOnInit(): void {
    const routePath = this.validRoute();
    if (routePath.indexOf('ping-login') > -1) {
      this.ping();
    } else if (routePath.indexOf('login') > -1) {
      this.login();
    } else if (routePath.indexOf('consumePing') > -1) {
      const consumeToken = this.route.snapshot.queryParams['api_token'];
      this.authService.redirectUrl = this.route.snapshot.queryParams[
        'redirectTo'
      ];
      this.consumePing(consumeToken);
    } else if (routePath.indexOf('consume') > -1) {
      const consumeToken = this.route.snapshot.queryParams['api_token'];
      this.authService.redirectUrl = this.route.snapshot.queryParams[
        'redirectTo'
      ];
      this.consume(consumeToken);
    } else if (routePath.indexOf('logout') > -1) {
      this.logout();
    }
  }

  ping(): void {
    this.authService.ping();
  }

}
