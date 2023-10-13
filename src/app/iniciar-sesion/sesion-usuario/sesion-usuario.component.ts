import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../usuario/Service/usuarioservice.service";

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

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  login() {
    if (this.cedula === '') {
      this.vacio = true;
      this.error = false;
    } else {
      this.router.navigate(['/usuario/dashboard']);
      this.numeroCedula = Number(this.cedula)
      this.usuarioService.setCedulaUsuarioActual(this.numeroCedula)
    }
  }

  loginVeterinario() {
    this.router.navigate(['/veterinario/login']);
  }

  loginAdmin() {
    this.router.navigate(['/administrador/login']);
  }
}
