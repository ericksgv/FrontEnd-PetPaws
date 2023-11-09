import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.css', '../../../styles.css', '../top-bar.component.css']
})
export class TopBarAdminComponent {
  constructor(private router: Router) {
  }
  cerrarCesion() {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    this.router.navigate(['/']);
    }
}
