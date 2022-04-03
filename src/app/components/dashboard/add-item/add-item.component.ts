import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/interfaces/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _itemService: ItemsService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarItem() {
    const item: Item = {
      id: 0,
      nombre: this.form.value.nombre,
      categoria: this.form.value.categoria,
      cantidad: this.form.value.cantidad,
    };
    this._itemService.agregarItem(item);

    this.form.reset();
    this.showSnack();
  }

  showSnack() {
    this._snackBar.open('Objeto agregado correctamente', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}