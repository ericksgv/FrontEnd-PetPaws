import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario'; // Asegúrate de importar la clase de usuario adecuada
import { UsuarioService } from '../Service/usuarioservice.service'; // Importa el servicio de usuarios
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {

  selectedSortBy: string = 'cedula'; // Valor predeterminado
  selectedSortOrder: string = 'asc'; // Valor predeterminado
  usuarios: Usuario[] = [];
  rol: String = '';

  busquedaAvanzada: string = ''; // Variable para el atributo de búsqueda avanzada
  textoBusqueda: string = '';
  usuariosFiltrados: any[] = [];

  filtroActivoCedula = false;
  filtroActivoNombre = false;
  filtroActivoCorreo = false;
  filtroActivoCelular = false;
  filtroActivoEstado = false;

  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];
  usuariosSort: any[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router,private veterinarioService: VeterinarioService) {}

  ngOnInit() {
    this.veterinarioService.getRol().subscribe((rol) => {
      this.rol = rol;
      console.log(this.rol);
    });
    this.getUsuarios();
  }

  ordenarUsuarios() {
    this.usuariosSort = this.usuariosFiltrados;
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

  filtrarUsuarios() {
    if (this.textoBusqueda.trim() === '') {
      // Si el campo de búsqueda está vacío, muestra todos los usuarios.
      this.usuariosFiltrados = this.usuarios;

    } else {
      // Filtra los usuarios que coinciden con el texto de búsqueda.
      this.usuariosFiltrados = this.usuarios.filter((usuario) => {
        return usuario.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        usuario.estado.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        usuario.celular.toString().includes(this.textoBusqueda) ||
        usuario.cedula.toString().includes(this.textoBusqueda);
      });

      this.calcularPaginas();
      this.actualizarRangoPaginas();
    }
  }

  cambiarCantidadPorPagina() {
    this.calcularPaginas();
    this.paginaActual = 1; // Vuelve a la primera página al cambiar la cantidad por página
    this.calcularIndicesPagina(); // Actualiza los índices de página
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['unauthorized']);
        } else if (error.status === 403) {
          console.log('Forbidden error. Redirecting to forbidden page.');
          this.router.navigate(['forbidden']);
        } else {
          console.error('An error occurred:', error);
          // Puedes agregar más lógica aquí para manejar otros tipos de errores si es necesario.
        }
        return of(null); // Return an empty observable to avoid further error propagation.
      })
    )
    .subscribe((usuarios) => {
      this.usuarios = usuarios ?? [];
      this.usuariosFiltrados = this.usuarios;
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    });
  }

  restaurarFiltros() {
    this.filtroActivoCedula = false;
    this.filtroActivoNombre = false;
    this.filtroActivoCorreo = false;
    this.filtroActivoCelular = false;
    this.filtroActivoEstado = false;
    this.calcularPaginas();
    this.actualizarRangoPaginas();
  }

  filtrarPorAtributo(atributo: string) {
    if(this.filtroActivoCedula){
      atributo = 'limpiar'
    } else
    if(this.filtroActivoNombre){
      atributo = 'limpiar'
    } else if(this.filtroActivoCorreo){
      atributo = 'limpiar'
    }
    else if(this.filtroActivoCelular){
      atributo = 'limpiar'
    }
    else if(this.filtroActivoEstado){
      atributo = 'limpiar'
    }
    if (atributo === 'limpiar') {
      // Limpia el campo de búsqueda avanzada y muestra todos los usuarios
      this.busquedaAvanzada = '';
      this.restaurarFiltros();
      this.filtrarUsuarios();
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    } else {
      // Filtra los usuarios que coinciden con el texto de búsqueda y el atributo de búsqueda avanzada.
      this.filtrarUsuarios();
      this.restaurarFiltros();
      if (atributo == 'cedula')
        this.filtroActivoCedula = !this.filtroActivoCedula;
      else
      if (atributo == 'nombre')
        this.filtroActivoNombre = !this.filtroActivoNombre;
      else if (atributo == 'correo')
        this.filtroActivoCorreo = !this.filtroActivoCorreo;
      else if (atributo == 'celular')
        this.filtroActivoCelular = !this.filtroActivoCelular;
      else if (atributo == 'estado')
        this.filtroActivoEstado = !this.filtroActivoEstado;

      this.usuariosFiltrados = this.usuariosFiltrados.filter(usuario => {
        const atributoBusqueda = this.textoBusqueda;
        if (atributo == 'cedula') {
          return usuario.cedula.toString().includes(atributoBusqueda);
        } else
        if (atributo == 'nombre') {
          return usuario.nombre.toLowerCase().includes(atributoBusqueda);
        } else if (atributo == 'correo') {
          return usuario.correo.toLowerCase().includes(atributoBusqueda);
        } else if (atributo == 'estado') {
          return usuario.estado.toLowerCase().includes(atributoBusqueda);
        }else if (atributo == 'celular') {
          return usuario.celular.toString().includes(atributoBusqueda);
        }
      });
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    }
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }

  activarUsuario(id: number) {
    this.usuarioService.activarUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }
  toggleEstadoUsuario(usuario: any) {
    if (usuario.estado === 'activo') {
      this.eliminarUsuario(usuario.id);
    } else if (usuario.estado === 'inactivo') {
      this.activarUsuario(usuario.id);
    }
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
    const cantidadPaginas = Math.ceil(this.usuariosFiltrados.length / this.itemsPorPagina);
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

  listarMascotas(cedula: number) {
    localStorage.setItem('cedula', cedula.toString());
}


}

