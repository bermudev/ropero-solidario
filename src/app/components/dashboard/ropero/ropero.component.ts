//import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface UserData {
  id: string;
  nombre: string;
  cantidad: string;
  categoria: string;
}


/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'Primavera',
  'Verano',
  'Otoño',
  'Invierno',
];
const NAMES: string[] = [
  'Camiseta',
  'Pantalón',
  'Abrigo',
  'Blusa',
  'Botas',
  'Calcetines',
  'Camisa',
  'Cazadora',
  'Chaqueta',
  'Zapatos',
  'Falda',
  'Jersey',
  'Pantalón corto',
  'Traje',
  'Vestido',
  'Corbata',
  'Sombrero',
];


@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.component.html',
  styleUrls: ['./ropero.component.css']
})

export class RoperoComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'cantidad', "acciones"];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))];

  return {
    id: id.toString(),
    nombre: name,
    cantidad: Math.round(Math.random() * 10).toString(),
    categoria: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
