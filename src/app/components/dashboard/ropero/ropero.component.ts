import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.component.html',
  styleUrls: ['./ropero.component.css'],
})
export class RoperoComponent implements AfterViewInit {
  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _itemsService: ItemsService) {}

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems() {
    this.ELEMENT_DATA = this._itemsService.getItems();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
}
