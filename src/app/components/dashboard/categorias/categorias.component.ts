import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  data: Category[] = [];
  names: string[] = [];

  selectedAddCategory: string = ""
  selectedDelCategory: string = ""
  selectedEditCategory: string = ""
  selectedEditNewCategory: string = ""

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCategories().subscribe((data) => {
      // hacemos que el json pase a string
      this.data = JSON.parse(JSON.stringify(data));

      // extraemos los valores de los names mediante el metodo .map()
      this.names = this.data.map((d) => d.name);

      // los ordenamos para que quede más bonito
      const sort = (str: string[]): string =>
        str.sort((a, b) => a.localeCompare(b)).join('');

      sort(this.names);
    });
  }

  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 991;

    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  addCategoryClick() {
    console.log(`Agregar categoria ${this.selectedAddCategory}`);
  }

  delCategoryClick() {
    console.log(`Eliminar categoria ${this.selectedDelCategory}`);
  }

  editCategoryClick() {
    console.log(`Editar categoria ${this.selectedEditCategory}`);
    console.log(`Nueva categoria ${this.selectedEditNewCategory}`);
  }
}
