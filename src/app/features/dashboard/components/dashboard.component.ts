import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  tabs = ['Market', 'Pricing', 'Executive', 'Geography'];
  selectedTabIndex = 0;
  constructor() {}
}
