import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../usuario/Service/usuarioservice.service";
import {FormControl, Validators} from "@angular/forms";
import {catchError} from "rxjs";
import Swal from 'sweetalert2';
import { LoginModel } from 'src/app/model/loginModel';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.component.html',
  styleUrls: ['./sesion-usuario.component.css', '../../../styles.css']
})
export class SesionUsuarioComponent {
  cedula: string = ''
  usuarioEncontrado: boolean = true
  usuarioInactivo: boolean = false
  userRole: string | undefined;
  cedulaUsuarioString: string = ''
  campoCedula = new FormControl('', [
    Validators.required
  ])


  constructor(private router: Router, private usuarioService: UsuarioService, private veterinarioService: VeterinarioService) {}
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
    const infoLogin = new LoginModel(Number(this.campoCedula.value!), "1");
    this.usuarioService.login(infoLogin).pipe(
      catchError((error) => {
        this.usuarioEncontrado = true;
        console.error('Vet no encontrado. Error:', error);
        return [];
      })
      )
      .subscribe((token) => {
        localStorage.setItem('token', String(token))
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
      });
  }

  loginVeterinario() {
    this.router.navigate(['/veterinario/login']);
  }

  loginAdmin() {
    this.router.navigate(['/administrador/login']);
  }
}
