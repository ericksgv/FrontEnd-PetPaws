import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css', '../unauthorized/unauthorized.component.css']
})
export class ForbiddenComponent {
  constructor() {
    // Verifica si el item 'paginaAnterior' está en el localStorage y tiene el valor "inicioSesion"
    const paginaAnterior = localStorage.getItem('paginaAnterior');
    
    if (paginaAnterior === 'inicioSesion') {
      // Elimina el item 'paginaAnterior'
      localStorage.removeItem('paginaAnterior');
      localStorage.removeItem('token');
    }
  }
}
