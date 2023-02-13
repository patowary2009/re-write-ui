import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './components/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MarketComponent } from './components/market/market.component';

@NgModule({
  declarations: [DashboardComponent, MarketComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HighchartsChartModule,
  ],
})
export class DashboardModule {}
