import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  private baseUrl = environment.API_BASE_URL;

  data = {};
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCategories().subscribe((data) => (this.data = data))
  }

  // solo para testing
  headerOutside() {
    this.httpClient
      .get(`${this.baseUrl}/categories`)
      .subscribe((data) => (this.data = data));
  }

  // solo para testing
  headerInside() {
    const token = localStorage.getItem('access_token'); // Will return if it is not set
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    this.httpClient
      .get(`${this.baseUrl}/categories`, httpOptions)
      .subscribe((data) => (this.data = data));
  }
}
