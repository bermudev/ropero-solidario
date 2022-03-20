import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RoperoComponent } from './ropero/ropero.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RoperoComponent,
    NavbarComponent,
    RoperoComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
