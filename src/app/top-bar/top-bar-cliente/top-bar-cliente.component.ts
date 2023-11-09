import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar-cliente',
  templateUrl: './top-bar-cliente.component.html',
  styleUrls: ['./top-bar-cliente.component.css', '../../../styles.css', '../top-bar.component.css']
})
export class TopBarClienteComponent {
  constructor(private router: Router) {
  }
  cerrarCesion() {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    this.router.navigate(['/']);
    }
}
