import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Item } from 'src/app/interfaces/item';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.component.html',
  styleUrls: ['./ropero.component.css'],
})
export class RoperoComponent implements AfterViewInit {
  ELEMENTS_DATA: Item[] = [];
  displayedColumns: string[] = ['name', 'category', 'amount', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  categoriesList: Category[] = [];

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
  constructor(
    private _itemsService: ItemsService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  //creamos una funcion para cargar los datos desde el servicio
  cargarItems() {
    this.authService.getItems().subscribe((data) => {
      this.ELEMENTS_DATA = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(this.ELEMENTS_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  // ejecutamos la funcion al inicio
  ngOnInit(): void {
    this.authService.getCategories().subscribe((data) => {
      this.categoriesList = JSON.parse(JSON.stringify(data));
    });

    this.cargarItems();
  }

  openDialog(ELEMENT: Item) {
    // justo en esa linea de debajo es donde se le puede pasar argumentos tengo entendido
    const dialogRef = this.dialog.open(DialogComponent, {
      data: ELEMENT,
    });

    // aqui leemos el resultado de la ejecucion del dialog
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminarItemTrue(ELEMENT);
      }
    });
  }

  // funcion para eliminar un usuario usando el boton de papelera
  eliminarItemTrue(ELEMENT: Item) {
    this._itemsService.eliminarItem(ELEMENT);
    this.cargarItems();
    this.dataSource.paginator = this.paginator;
  }
}
