import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sesion-veterinario',
  templateUrl: './sesion-veterinario.component.html',
  styleUrls: ['./sesion-veterinario.component.css', '../../../styles.css']
})
export class SesionVeterinarioComponent {
  cedula: string = '';
  password: string = ''; 
  error: boolean = false;
  vacio: boolean = false;
  inactive: boolean = false;
  message: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    this.error = false;
    this.vacio = false;
    this.inactive = false;
    this.message = '';

    if (!this.cedula) {
      this.vacio = true;
    } else {
      const data = {
        cedula: this.cedula,
        password: this.password,
      };

      this.http.post('http://localhost:8090/loginVeterinario/login', data, { responseType: 'text' }).subscribe(
        (response) => {
          if (response === 'success') {
            this.router.navigate(['/veterinario/dashboard', this.cedula]);
          } else if (response === 'inactive') {
            this.inactive = true;
            this.message = 'El usuario actualmente se encuentra inactivo. Por favor, comunícate con el administrador para activar la cuenta de nuevo.';
          } else if (response === 'incorrect') {
            this.message = 'Datos Incorrectos. Intente de nuevo';
            this.error = true;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
