import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if (usuario == 'admin' && password == 'admin123') {
      this.router.navigate(['dashboard']);
    } else {
      this.showError();
    }
  }

  showError() {
    this._snackBar.open('Usuario o contraseña incorrectos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  ngOnInit(): void {}
}
