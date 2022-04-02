import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private _itemService: ItemsService) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      categoria: ["", Validators.required],
      cantidad: ["", Validators.required]

    })
  }

  ngOnInit(): void {}

  agregarItem() {
    const item: Item = {
      id: 0,
      nombre: this.form.value.nombre,
      categoria: this.form.value.categoria,
      cantidad: this.form.value.cantidad
    }

    console.log(item);
    this._itemService.agregarItem(item)
    
  }
}


