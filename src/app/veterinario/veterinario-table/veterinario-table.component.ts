import { Component, OnInit } from '@angular/core';
import { Veterinario } from 'src/app/model/veterinario'; // Importa la clase Veterinario adecuada
import { VeterinarioService } from '../Service/service.service'; // Importa el servicio de veterinarios
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.css']
})
export class VeterinarioTableComponent implements OnInit {
  // Propiedades para mantener el estado de las selecciones
  selectedSortBy: string = 'cedula'; // Valor predeterminado
  selectedSortOrder: string = 'asc'; // Valor predeterminado
  veterinarios: Veterinario[] = []; // Usar la interfaz para definir el tipo

  busquedaAvanzada: string = ''; // Variable para el atributo de búsqueda avanzada
  textoBusqueda: string = '';
  veterinariosFiltrados: any[] = [];

  filtroActivoNombre = false;
  filtroActivoEspecialidad = false;
  filtroActivoNAtenciones = false;
  filtroActivoEstado = false;

  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];
  veterinariosSort: any[] = [];

  constructor(private veterinarioService: VeterinarioService, private router: Router) {
  }

  ngOnInit() {
    this.getVeterinarios();
  }



  ordenarVeterinarios() {
    this.veterinariosSort = this.veterinariosFiltrados;
    this.veterinariosSort.sort((a, b) => {
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

  getVeterinarios() {
    this.veterinarioService.getVeterinarios().subscribe((veterinarios) => {
      this.veterinarios = veterinarios;
      this.veterinariosFiltrados = veterinarios;
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    });
  }

  filtrarVeterinarios() {
    if (this.textoBusqueda.trim() === '') {
      // Si el campo de búsqueda está vacío, muestra todos los veterinarios.
      this.veterinariosFiltrados = this.veterinarios;

    } else {
      // Filtra los veterinarios que coinciden con el texto de búsqueda.
      this.veterinariosFiltrados = this.veterinarios.filter(veterinario => veterinario.cedula.toString().includes(this.textoBusqueda));
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    }
  }

  restaurarFiltros() {
    this.filtroActivoNombre = false;
    this.filtroActivoEspecialidad = false;
    this.filtroActivoNAtenciones = false;
    this.filtroActivoEstado = false;
    this.calcularPaginas();
    this.actualizarRangoPaginas();
  }

  filtrarPorAtributo(atributo: string) {
    if (atributo === 'limpiar') {
      // Limpia el campo de búsqueda avanzada y muestra todos los veterinarios
      this.busquedaAvanzada = '';
      this.restaurarFiltros();
      this.filtrarVeterinarios();
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    } else {
      // Filtra los veterinarios que coinciden con el texto de búsqueda y el atributo de búsqueda avanzada.
      this.filtrarVeterinarios();
      this.restaurarFiltros();
      if (atributo == 'nombre')
        this.filtroActivoNombre = !this.filtroActivoNombre;
      else if (atributo == 'especialidad')
        this.filtroActivoEspecialidad = !this.filtroActivoEspecialidad;
      else if (atributo == 'atenciones')
        this.filtroActivoNAtenciones = !this.filtroActivoNAtenciones;
      else if (atributo == 'estado')
        this.filtroActivoEstado = !this.filtroActivoEstado;

      this.veterinariosFiltrados = this.veterinariosFiltrados.filter(veterinario => {
        const atributoBusqueda = this.busquedaAvanzada;
        if (atributo == 'nombre') {
          return veterinario.nombre.toLowerCase().includes(atributoBusqueda);
        } else if (atributo == 'especialidad') {
          return veterinario.especialidad.toLowerCase().includes(atributoBusqueda);
        } else if (atributo == 'estado') {
          return veterinario.estado.toLowerCase().includes(atributoBusqueda);
        }else if (atributo == 'atenciones') {
          return veterinario.numeroAtenciones.toString().includes(atributoBusqueda);
        } 
      });
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    }
  }

  eliminarVeterinario(id: number) {
    this.veterinarioService.eliminarVeterinario(id).subscribe(() => {
      this.getVeterinarios();
    });
  }


  activarVeterinario(id: number) {
    this.veterinarioService.activarVeterinario(id).subscribe(() => {
      this.getVeterinarios();
    });
  }


  modificarVeterinario(id: number) {
    this.router.navigate(['/veterinario/update', id]);
  }

  calcularIndicesPagina() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return { inicio, fin };
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
    this.indicePaginaActual = pagina;
    this.actualizarRangoPaginas();
  }

  calcularPaginas() {
    const cantidadPaginas = Math.ceil(this.veterinariosFiltrados.length / this.itemsPorPagina);
    this.paginas = Array.from({ length: cantidadPaginas }, (_, index) => index + 1);
    this.actualizarRangoPaginas();
  }

  actualizarRangoPaginas() {
    const rangoVisible = 2;
    let inicio = Math.max(this.paginaActual - Math.floor(rangoVisible / 2), 1);
    let fin = Math.min(inicio + rangoVisible - 1, this.paginas.length);
    if (fin === this.paginas.length) {
      inicio = Math.max(fin - rangoVisible + 1, 1);
    }
    this.rangoPaginas = Array.from({ length: fin - inicio + 1 }, (_, index) => inicio + index);
  }
}

