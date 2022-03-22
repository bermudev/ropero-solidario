import { Injectable } from '@angular/core';
import { PeriodicElement } from '../components/dashboard/ropero/ropero.component';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, acciones: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, acciones: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, acciones: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, acciones: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, acciones: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, acciones: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, acciones: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, acciones: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, acciones: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, acciones: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, acciones: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, acciones: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, acciones: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, acciones: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, acciones: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, acciones: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, acciones: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, acciones: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, acciones: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, acciones: 'Ca' },
  ];

  constructor() {}

  // devolvemos en los otros ts el elemento con los datos
  getItems() {
    return this.ELEMENT_DATA.slice();
  }

  // eliminamos el item con splice que elimina por posicion, habria que cambiar para que elimine segun el id que se le pase
  // buscar el indice segun el id enviado y eliminar ese indice?
  // https://bobbyhadz.com/blog/javascript-remove-object-from-array-by-value
  eliminarItem(index: number){
    const indexOfObject = this.ELEMENT_DATA.findIndex(object => {
      return object.position === index;
    })

    //aqui realmente se haría el query http
    this.ELEMENT_DATA.splice(indexOfObject, 1)
  }
}
