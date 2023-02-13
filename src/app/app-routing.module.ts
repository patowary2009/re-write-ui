import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { UnauthorizedComponent } from './authentication/unauthorized/unauthorized.component';
import { PingComponent } from './authentication/ping/ping.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'consume', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  {
    path: 'ping',
    component: PingComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: 'ping-login', component: LoginComponent },
  { path: 'consumePing', component: LoginComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
