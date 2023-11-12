import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';

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
  userRole: string | undefined;
  constructor(private router: Router, private http: HttpClient, private veterinarioService: VeterinarioService) { }

  ngOnInit() {


    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');

    if (token) {
      this.veterinarioService.getRol().subscribe((rol) => {
        this.userRole = rol;
        console.log(this.userRole);
        // Si es administrador mostrar los botones de agregar y eliminar
        if (this.userRole == 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        }
        // Si es veterinario mostrar los botones de agregar y eliminar
        else if (this.userRole == 'VETERINARIO') {
          this.router.navigate(['/veterinario/dashboard']);
        }

        // Si es usuario mostrar los botones de agregar y eliminar
        else if (this.userRole == 'CLIENTE') {
          this.router.navigate(['/usuario/dashboard']);
        }
      });
    }

}

  login() {
    this.error = false;
    this.vacio = false;

    if (!this.cedula || !this.password) {
      this.vacio = true;
    } else {
      const data = {
        cedula: this.cedula,
        contrasena: this.password,
      };

      this.http.post('http://localhost:8090/loginAdministrador/login', data, { responseType: 'text' })
        .pipe(
          catchError((error) => {
            this.error = true;
            console.error('Error en el inicio de sesión del administrador:', error);
            return [];
          })
        )
        .subscribe((response) => {
          localStorage.setItem('token', String(response));
          localStorage.setItem('paginaAnterior', String("inicioSesion"))
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
