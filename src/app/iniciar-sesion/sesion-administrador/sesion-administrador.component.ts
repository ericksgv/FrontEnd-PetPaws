import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion-administrador',
  templateUrl: './sesion-administrador.component.html',
  styleUrls: ['./sesion-administrador.component.css']
})
export class SesionAdministradorComponent {
  cedula: string = '';
  error: boolean = false;
  vacio: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (this.cedula === '') {
      this.vacio = true;
      this.error = false;
    } else {
      // Aquí puedes agregar lógica adicional para verificar la cédula y contraseña del administrador y autenticarlo.
      // Si la autenticación es exitosa, puedes redirigir al administrador a la página deseada.
      this.router.navigate(['/dashboard-admin']); // Cambia '/dashboard-admin' por la ruta que desees para el administrador.
    }
  }

  
}
