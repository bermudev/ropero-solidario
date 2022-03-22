import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  acciones: string;
}

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.component.html',
  styleUrls: ['./ropero.component.css'],
})
export class RoperoComponent implements AfterViewInit {
  // creamos una variable de elementos vacía
  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'acciones'];
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
}
