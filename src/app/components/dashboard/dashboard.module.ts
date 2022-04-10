import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RoperoComponent } from './ropero/ropero.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AddItemComponent } from './add-item/add-item.component';
import { DialogComponent } from './ropero/dialog/dialog.component';
import { PapeleraComponent } from './papelera/papelera.component';
import { CategoriasComponent } from './categorias/categorias.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RoperoComponent,
    RoperoComponent,
    ConfiguracionComponent,
    AddItemComponent,
    DialogComponent,
    PapeleraComponent,
    CategoriasComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
