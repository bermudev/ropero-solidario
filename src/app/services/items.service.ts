import { Injectable } from '@angular/core';
import { ObjectsList } from '../components/dashboard/ropero/ropero.component';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  ELEMENT_DATA: ObjectsList[] = [
    { id: 1, nombre: 'Chaleco', categoria: 'Invierno', cantidad: 2 },
    { id: 2, nombre: 'Pantalón', categoria: 'Primavera', cantidad: 4 },
    { id: 3, nombre: 'Camiseta', categoria: 'Verano', cantidad: 6 },
  ];

  constructor() {}

  // devolvemos en los otros ts el elemento con los datos
  getItems() {
    return this.ELEMENT_DATA.slice();
  }

  // eliminamos el item con splice que elimina por posicion, habria que cambiar para que elimine segun el id que se le pase
  // buscar el indice segun el id enviado y eliminar ese indice?
  // https://bobbyhadz.com/blog/javascript-remove-object-from-array-by-value
  eliminarItem(index: number) {
    const indexOfObject = this.ELEMENT_DATA.findIndex((object) => {
      console.log(object.id);
      return object.id === index;
    });

    //aqui realmente se haría el query http
    this.ELEMENT_DATA.splice(indexOfObject, 1);
  }

  agregarItem(item: Item) {
    item.id = this.ELEMENT_DATA.length + 1;
    this.ELEMENT_DATA.unshift(item);
  }
}
