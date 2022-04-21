import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Item } from '../interfaces/item';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // cargamos la URL desde las variables de environment, asi cambia segun sea la build de dev o pro
  endpoint: string = environment.API_BASE_URL;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  data = {};
  loginError = false;

  constructor(
    private http: HttpClient,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/auth`, user).subscribe(
      (res: any) => {
        //Success
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        //Error callback
        //console.log(error);
        //console.error('error caught in component');

        // Creo que idealmente esto deberia estar en login.component.ts pero no se como pasarle la informacion del error desde aqui
        this._snackBar.open('Usuario o contraseña incorrectos', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // EMPIEZAN LAS LLAMADAS A LA API

  // CATEGORIAS
  getCategories() {
    return (this.data = this.http.get(`${this.endpoint}/categories`));
  }

  // ITEMS
  getItems(): Observable<Item[]> {
    return (this.data = this.http.get<Item[]>(`${this.endpoint}/items`));
  }

  getSingleItem(ID: number) {
    return (this.data = this.http.get<Item[]>(`${this.endpoint}/items/${ID}`))
  }

  delItem(ID: number) {
    this.data = this.http.delete(`${this.endpoint}/items/${ID}`).subscribe();
  }

  postItem(ELEMENT: Item) {
    // le tenemos que quitar el id pero hay que cambiar y poner el id opcional en la interfaz primero
    delete ELEMENT.id;
    this.data = this.http
      .post<Item>(`${this.endpoint}/items`, ELEMENT)
      .subscribe();
  }

  postEditedItem(ELEMENT: Item) {
    // le tenemos que quitar el id pero hay que cambiar y poner el id opcional en la interfaz primero
    const idItem = ELEMENT.id
    delete ELEMENT.id;
    console.log(idItem);
    console.log(ELEMENT);
    
    this.data = this.http
      .put<Item>(`${this.endpoint}/items/${idItem}`, ELEMENT)
      .subscribe();
  }
}
