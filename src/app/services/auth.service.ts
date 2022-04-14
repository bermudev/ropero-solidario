import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Item } from '../interfaces/item';

@Injectable({ providedIn: 'root' })
export class AuthService {
  endpoint: string = 'http://34.83.143.73:8850';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  data = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);

        this.router.navigate(['dashboard']);
      });
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

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
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

  delItem(ID: number) {
    this.data = this.http.delete(`${this.endpoint}/items/${ID}`).subscribe();
  }

  postItem(ELEMENT: Item) {
    // le tenemos que quitar el id pero hay que cambiar y poner el id opcional en la interfaz primero
    delete ELEMENT.id;
    console.log(ELEMENT);
    

    this.data = this.http.post<Item>(`${this.endpoint}/items/`, ELEMENT).subscribe();
  }
}
