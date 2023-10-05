import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.component.html',
  styleUrls: ['./sesion-usuario.component.css']
})
export class SesionUsuarioComponent {
  cedula: string = '';
  error: boolean = false;
  vacio: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (this.cedula === '') {
      this.vacio = true;
      this.error = false;
    } else {
      this.router.navigate(['/dashboard']); 
    }
  }

  loginVeterinario() {
    this.router.navigate(['/veterinario/login']);
  }

  loginAdmin() {
    this.router.navigate(['/administrador/login']);
  }
}
