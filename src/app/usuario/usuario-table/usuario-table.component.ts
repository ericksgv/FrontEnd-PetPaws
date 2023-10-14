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
  selectedSortBy: string = 'cedula'; // Valor predeterminado
  selectedSortOrder: string = 'asc'; // Valor predeterminado
  usuarios: Usuario[] = [];
  itemsPorPagina: number = 15;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];
  usuariosSort: any[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.getUsuarios();
  }

  ordenarVeterinarios() {
    this.usuariosSort = this.usuarios;
    this.usuariosSort.sort((a, b) => {
      const valueA = a[this.selectedSortBy];
      const valueB = b[this.selectedSortBy];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.selectedSortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.selectedSortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return 0;
      }
    });
  }

  cambiarCantidadPorPagina() {
    this.calcularPaginas();
    this.paginaActual = 1; // Vuelve a la primera página al cambiar la cantidad por página
    this.calcularIndicesPagina(); // Actualiza los índices de página
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

