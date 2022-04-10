import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectsList } from '../components/dashboard/ropero/ropero.component';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  ELEMENT_DATA: ObjectsList[] = [
    { id: 0, nombre: 'Chaleco', categoria: 'Invierno', cantidad: 2 },
    { id: 1, nombre: 'Pantalón', categoria: 'Primavera', cantidad: 4 },
    { id: 2, nombre: 'Camiseta', categoria: 'Verano', cantidad: 6 },
  ];

  constructor(private _snackBar: MatSnackBar) {}

  // devolvemos en los otros ts el elemento con los datos
  getItems() {
    return this.ELEMENT_DATA.slice();
  }

  // eliminamos el item con splice que elimina por posicion, habria que cambiar para que elimine segun el id que se le pase
  // buscar el indice segun el id enviado y eliminar ese indice?
  // https://bobbyhadz.com/blog/javascript-remove-object-from-array-by-value
  eliminarItem(index: number) {
    const indexOfObject = this.ELEMENT_DATA.findIndex((object) => {
      return object.id === index;
    });

    //aqui realmente se haría el query http
    this.ELEMENT_DATA.splice(indexOfObject, 1);
    this._snackBar.open('Objeto eliminado correctamente', '', {
      duration: 5000,
    });
  }

  agregarItem(item: Item) {
    item.id = this.ELEMENT_DATA.length + 1;
    this.ELEMENT_DATA.unshift(item);
  }

  getSingleItem(index: number) {
    return this.ELEMENT_DATA[index];
  }

  editarItem(item: Item, idItem: number) {
    this.ELEMENT_DATA[idItem].nombre = item.nombre;
    this.ELEMENT_DATA[idItem].categoria = item.categoria;
    this.ELEMENT_DATA[idItem].cantidad = item.cantidad;
  }
}
