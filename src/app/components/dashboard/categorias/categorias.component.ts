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
  categoriesList: Category[] = [];
  categoriesNames: string[] = [];
  isMobile = false;

  selectedAddCategory: string = '';
  selectedDelCategory: string = '';
  selectedEditCategory: string = '';
  selectedEditNewCategory: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadCatFromAPI();
  }

  loadCatFromAPI() {
    this.authService.getCategories().subscribe((data) => {
      // hacemos que el json pase a string
      this.categoriesList = JSON.parse(JSON.stringify(data));

      // extraemos los valores de los names mediante el metodo .map()
      this.categoriesNames = this.categoriesList.map((d) => d.name);

      // los ordenamos para que quede más bonito
      const sort = (str: string[]): string =>
        str.sort((a, b) => a.localeCompare(b)).join('');

      sort(this.categoriesNames);
    });
  }

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
    //console.log(`Agregar categoria ${this.selectedAddCategory}`);

    const category: Category = {
      name: this.selectedAddCategory,
    };

    this.authService.addCategorie(category);
    this.loadCatFromAPI()
  }

  delCategoryClick() {
    //console.log(`Eliminar categoria ${this.selectedDelCategory}`);

    const category = this.categoriesList.find((d) => d.name === this.selectedDelCategory);
    
    // necesito extraer el id buscando en el objeto por el nombre del data
    // console.log(idCategory?.id);

    // le pongo el ! al final para decirle que no es undefined, el signo de interrogacion la verdad que no lo se
    this.authService.deleteCategorie(category?.id!)
    this.loadCatFromAPI()
  }

  editCategoryClick() {
    //console.log(`Editar categoria ${this.selectedEditCategory}`);
    //console.log(`Nueva categoria ${this.selectedEditNewCategory}`);

    // las dos interrogaciones es para decirles que ambos va a tener typo y no seran undefined (no se si es buena practica)
    const oldCategoryID = this.categoriesList.find((d) => d.name === this.selectedEditCategory)!.id!;
    
    const category: Category = {
      name: this.selectedEditNewCategory,
    };

    // le mandamos el name de selectedEditNewCategory y el id del selectedEditCategory
    this.authService.editCategorie(category, oldCategoryID)

    this.loadCatFromAPI()
  }
}
