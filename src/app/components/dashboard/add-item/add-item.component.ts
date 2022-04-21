import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
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

  constructor(
    private fb: FormBuilder,
    private _itemService: ItemsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: [0, Validators.required],
      cantidad: ['', Validators.required],
    });

    // esto es un poco de magia
    // si es crear idItem es undefined y si es editar es un numero
    const idParam = 'id';
    this.idItem = this.aRoute.snapshot.params[idParam];
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
    const ELEMENT: Item = {
      id: this.idItem,
      name: this.form.value.nombre,
      category: this.form.value.categoria,
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
      //console.log(itemToEdit);

      // meto en la pantalla de edit los datos del objeto en los campos correspondiente
      this.form.patchValue({
        nombre: itemToEdit.name,
        categoria: itemToEdit.category,
        cantidad: itemToEdit.amount,
      });
    });
  }
}
