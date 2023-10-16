import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../usuario/Service/usuarioservice.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.component.html',
  styleUrls: ['./sesion-usuario.component.css', '../../../styles.css']
})
export class SesionUsuarioComponent {
  cedula: string = '';
  numeroCedula : number = -1
  error: boolean = false;
  vacio: boolean = false;

  campoCedula = new FormControl('', [
    Validators.required
  ])


  constructor(private router: Router, private usuarioService: UsuarioService) {}

  login() {
    if (this.cedula === '') {
      this.vacio = true;
      this.error = false;

    } else {
      const cedulaUsuario = this.campoCedula.value

       this.usuarioService.getUsuarioPorCedula(+cedulaUsuario!).subscribe(
         (datosUsuario) => {

           if (datosUsuario != null){
             this.usuarioService.guardaUsuarioEnLocalStorage(datosUsuario)
             this.router.navigate(['/usuario/dashboard']);
           }

         }
       )

    }
  }

  loginVeterinario() {
    this.router.navigate(['/veterinario/login']);
  }

  loginAdmin() {
    this.router.navigate(['/administrador/login']);
  }
}
