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
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
    });

    // esto es un poco de magia
    // si es crear idItem es undefined y si es editar es un numero
    const idParam = 'id';
    this.idItem = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.idItem !== undefined) {
      this.action = 'Editar';
      this.checkEdit();
    }
  }

  actOnItem() {
    const item: Item = {
      id: this.idItem,
      nombre: this.form.value.nombre,
      categoria: this.form.value.categoria,
      cantidad: this.form.value.cantidad,
    };

    // preguntamos si es agregar o editar
    if (this.idItem !== undefined) {
      this.editItem(item);
    } else {
      this.addItem(item);
    }
  }

  editItem(item: Item) {
    this._itemService.editarItem(item, item.id);
    this._snackBar.open('Objeto editado correctamente', '', {
      duration: 5000,
    });
    this.router.navigate(['/dashboard']);
  }

  addItem(item: Item) {
    this._itemService.agregarItem(item);
    this._snackBar.open('Objeto agregado correctamente', '', {
      duration: 5000,
    });
    this.router.navigate(['/dashboard']);
  }

  checkEdit() {
    const item: Item = this._itemService.getSingleItem(this.idItem);
    this.form.patchValue({
      nombre: item.nombre,
      categoria: item.categoria,
      cantidad: item.cantidad,
    });
  }
}
