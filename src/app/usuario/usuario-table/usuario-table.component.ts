import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario'; // Asegúrate de importar la clase de usuario adecuada
import { UsuarioService } from '../Service/usuarioservice.service'; // Importa el servicio de usuarios
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {
  usuarios: Usuario[] = [];
  itemsPorPagina: number = 15;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    });
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }

  modificarUsuario(id: number) {
    this.router.navigate(['/usuario/update', id]);
  }

  calcularIndicesPagina() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return { inicio, fin };
  }

  // Función para cambiar de página
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.indicePaginaActual = pagina;
    this.actualizarRangoPaginas();
  }

  calcularPaginas() {
    const cantidadPaginas = Math.ceil(this.usuarios.length / this.itemsPorPagina);
    this.paginas = Array.from({ length: cantidadPaginas }, (_, index) => index + 1);
    this.actualizarRangoPaginas();
  }

  actualizarRangoPaginas() {
    // Define el tamaño del rango de páginas que deseas mostrar
    const rangoVisible = 2; // Puedes ajustar este valor según tus preferencias

    // Calcula el índice de inicio del rango
    let inicio = Math.max(this.paginaActual - Math.floor(rangoVisible / 2), 1);

    // Calcula el índice de fin del rango
    let fin = Math.min(inicio + rangoVisible - 1, this.paginas.length);

    // Ajusta el inicio si el rango está completo
    if (fin === this.paginas.length) {
      inicio = Math.max(fin - rangoVisible + 1, 1);
    }

    // Crea un arreglo de números de página dentro del rango
    this.rangoPaginas = Array.from({ length: fin - inicio + 1 }, (_, index) => inicio + index);
  }
}

