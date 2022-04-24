import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Item } from 'src/app/interfaces/item';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  form: FormGroup;
  idItem: any;
  action = 'Agregar';

  categoriesList: Category[] = [];
  names: string[] = [];
  selectedCategory: string = '';

  constructor(
    private fb: FormBuilder,
    private _itemService: ItemsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
    });

    // esto es un poco de magia
    // si es crear idItem es undefined y si es editar es un numero
    const idParam = 'id';
    this.idItem = this.aRoute.snapshot.params[idParam];
  }

  // quizas hay que hacerlo de una manera en la que no se copie de nuevo toda la funcion de categorias.component.ts
  loadCatFromAPI() {
    this.authService.getCategories().subscribe((data) => {
      // hacemos que el json pase a string
      this.categoriesList = JSON.parse(JSON.stringify(data));
   
      // extraemos los valores de los names mediante el metodo .map()
      this.names = this.categoriesList.map((d) => d.name);

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

  ngOnInit(): void {
    this.loadCatFromAPI()

    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

    if (this.idItem !== undefined) {
      this.action = 'Editar';
      this.checkEdit();
    }
  }

  actOnItem() {
    // asignar nombre de categoria tipo string con el id que le corresponda
    const categoryID = this.categoriesList.find((d) => d.name === this.selectedCategory)!.id!;

    const ELEMENT: Item = {
      id: this.idItem,
      name: this.form.value.nombre,
      category: categoryID,
      amount: this.form.value.cantidad,
    };

    // preguntamos si es agregar o editar
    if (this.idItem !== undefined) {
      this.editItem(ELEMENT);
    } else {
      this.addItem(ELEMENT);
    }
  }

  editItem(item: Item) {
    this._itemService.editarItem(item);

    this._snackBar.open('Objeto editado correctamente', '', {
      duration: 5000,
    });
    this.router.navigate(['/dashboard/ropero']);
  }

  addItem(ELEMENT: Item) {
    this._itemService.agregarItem(ELEMENT);

    this._snackBar.open('Objeto agregado correctamente', '', {
      duration: 5000,
    });
    this.router.navigate(['/dashboard/ropero']);
  }

  checkEdit() {
    // Primero hago la query para que me de los datos del item que quiero editar segun el id
    let itemToEdit: Item;

    this._itemService.obtenerItem(this.idItem).subscribe((data) => {
      itemToEdit = JSON.parse(JSON.stringify(data));

      // Se extrae desde el id de categoria el nombre de categoria
      const category = this.categoriesList.find((d) => d.id == itemToEdit.category)!;

      // meto en la pantalla de edit los datos del objeto en los campos correspondiente
      if (category != undefined){
        this.selectedCategory = category.name;
      } 
      
      this.form.patchValue({
        nombre: itemToEdit.name,
        cantidad: itemToEdit.amount,
      });
    });
  }
}
