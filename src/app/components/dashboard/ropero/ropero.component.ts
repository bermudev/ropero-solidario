import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
} from '@costlydeveloper/ngx-awesome-popup';

export interface PeriodicElement {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: number;
}

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.component.html',
  styleUrls: ['./ropero.component.css'],
})
export class RoperoComponent implements AfterViewInit {
  // creamos una variable de elementos vacía
  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // para el paginator, cosas de material
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // para el filtro, cosas de material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // inyectamos el servicio
  constructor(private _itemsService: ItemsService) {}

  //creamos una funcion para cargar los datos desde el servicio
  cargarItems() {
    this.ELEMENT_DATA = this._itemsService.getItems();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  // ejecutamos la funcion al inicio
  ngOnInit(): void {
    this.cargarItems();
  }

  // funcion para eliminar un usuario usando el boton de papelera
  eliminarUsuario(index: number) {
    this._itemsService.eliminarItem(index);
    this.cargarItems();
    this.dataSource.paginator = this.paginator;
  }

  confirmBox(index: number) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('¿Estás seguro?');
    confirmBox.setMessage('Confirm to delete user: John Doe!');
    // Set button labels, the first argument for the confirmation button, and the second one for the decline button.
    confirmBox.setButtonLabels('Borrar', 'Cancelar');

    confirmBox.setConfig({
      disableIcon: true, // optional
      allowHtmlMessage: false, // optional
      buttonPosition: 'center', // optional
      // Evoke the confirmation box with predefined types.
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    // Simply evoke the popup and listen which button is clicked.
    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      // IConfirmBoxPublicResponse
      if(resp.success) {
        this.eliminarUsuario(index)
      }
      subscription.unsubscribe();
    });
  }
}
