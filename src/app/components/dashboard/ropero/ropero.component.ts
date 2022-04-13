import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.component.html',
  styleUrls: ['./ropero.component.css'],
})
export class RoperoComponent implements AfterViewInit {
  // creamos una variable de elementos vacía
  ELEMENT_DATA: Item[] = [];

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
  constructor(private _itemsService: ItemsService, public dialog: MatDialog) {}

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
  eliminarItemTrue(index: number) {
    this._itemsService.eliminarItem(index);
    this.cargarItems();
    this.dataSource.paginator = this.paginator;
  }

  openDialog(index: number) {
    // justo en esa linea de debajo es donde se le puede pasar argumentos tengo entendido
    const dialogRef = this.dialog.open(DialogComponent,{
      data: index
    });

    // aqui leemos el resultado de la ejecucion del dialog
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminarItemTrue(index);
      }
    });
  }
}
