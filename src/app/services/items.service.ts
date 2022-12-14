import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../interfaces/item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  ELEMENT: Item[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  // eliminamos el item con splice que elimina por posicion, habria que cambiar para que elimine segun el id que se le pase
  // buscar el indice segun el id enviado y eliminar ese indice?
  // https://bobbyhadz.com/blog/javascript-remove-object-from-array-by-value
  eliminarItem(ELEMENT: Item) {
    const indexOfObject = ELEMENT['id'];

    //aqui realmente se haría el query http
    //this.ELEMENT.splice(indexOfObject, 1);
    this.authService.delItem(indexOfObject!);

    this._snackBar.open('Objeto eliminado correctamente', '', {
      duration: 5000,
    });
  }

  agregarItem(ELEMENT: Item) {
    this.authService.postItem(ELEMENT);
  }

  // ! Arreglar esto para que haga la query al item desde auth.service y lo devuelva
  obtenerItem(index: number) {
    return this.authService.getSingleItem(index);
  }

  editarItem(item: Item) {
    this.authService.postEditedItem(item)
  }
}
