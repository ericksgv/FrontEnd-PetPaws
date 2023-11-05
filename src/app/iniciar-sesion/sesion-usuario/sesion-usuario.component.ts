import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../usuario/Service/usuarioservice.service";
import {FormControl, Validators} from "@angular/forms";
import {catchError} from "rxjs";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.component.html',
  styleUrls: ['./sesion-usuario.component.css', '../../../styles.css']
})
export class SesionUsuarioComponent {
  cedula: string = ''
  usuarioEncontrado: boolean = true
  usuarioInactivo: boolean = false
  cedulaUsuarioString: string = ''
  campoCedula = new FormControl('', [
    Validators.required
  ])


  constructor(private router: Router, private usuarioService: UsuarioService) {}


  login() {
    // Dado que siempre se va a retornar un valor, buscamos la cedula en los usuarios existentes.
    this.cedulaUsuarioString = this.campoCedula.value!;
    this.usuarioService
      .getUsuarioPorCedula(Number(this.cedulaUsuarioString))
      .pipe(
        catchError((error) => {
          this.usuarioEncontrado = false;
          console.error('Usuario no encontrado. Error:', error);
          return [];
        })
      )
      .subscribe((datosUsuario) => {
        if (datosUsuario != null && datosUsuario.estado === 'inactivo') {
          this.usuarioInactivo = true;
        }
        if (datosUsuario != null && datosUsuario.estado !== 'inactivo') {
          this.usuarioEncontrado = true;
          this.usuarioInactivo = false;
          this.usuarioService.guardaUsuarioEnLocalStorage(datosUsuario);

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
            this.router.navigate(['/usuario/dashboard']);
          });
        }
      });
  }

  loginVeterinario() {
    this.router.navigate(['/veterinario/login']);
  }

  loginAdmin() {
    this.router.navigate(['/administrador/login']);
  }
}
