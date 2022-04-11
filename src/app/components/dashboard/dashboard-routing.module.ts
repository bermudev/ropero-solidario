import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { DashboardComponent } from './dashboard.component';
import { PapeleraComponent } from './papelera/papelera.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RoperoComponent } from './ropero/ropero.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: RoperoComponent }, // se añade esto para que de primeras te muestre el ropero y no en blanco
      { path: 'ropero', component: RoperoComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'additem', component: AddItemComponent },
      { path: 'edit/:id', component: AddItemComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'papelera', component: PapeleraComponent },
      { path: 'pedidos', component: PedidosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
