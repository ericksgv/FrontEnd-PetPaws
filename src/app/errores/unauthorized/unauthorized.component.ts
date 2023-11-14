import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
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
