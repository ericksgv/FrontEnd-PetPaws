import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; 
import { catchError } from 'rxjs/internal/operators/catchError';
@Component({
  selector: 'app-sesion-administrador',
  templateUrl: './sesion-administrador.component.html',
  styleUrls: ['./sesion-administrador.component.css', '../../../styles.css']
})
export class SesionAdministradorComponent {
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
    this.message = '';

    if (!this.cedula) {
      this.vacio = true;
    } else {
      const data = {
        cedula: this.cedula,
        contrasena: this.password,
      };

      console.log(data)

      this.http.post('http://localhost:8090/loginAdministrador/login', data, { responseType: 'text' })

      .subscribe((response) => {
        console.log(response)
        localStorage.setItem('token', String(response))
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión Exitoso',
            text: 'Has iniciado sesión correctamente',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
          }).then(() => {
            this.router.navigate(['/admin/dashboard']);
          });
      });
    }
  }
}
