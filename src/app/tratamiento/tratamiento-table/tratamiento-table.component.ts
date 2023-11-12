import { Component, OnInit } from '@angular/core';
import { Tratamiento } from 'src/app/model/tratamiento';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';

@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.css'],
})
export class TratamientoTableComponent implements OnInit {
  busquedaAvanzada: string = ''; // Variable para el atributo de búsqueda avanzada
  textoBusqueda: string = '';
  tratamientosFiltrados: any[] = [];
  tratamientosSort: any[] = [];
  selectedSortBy: string = 'id'; // Valor predeterminado
  selectedSortOrder: string = 'asc'; // Valor predeterminado
  rol: String = '';
  filtroActivoIdMascota = false;
  filtroActivoMedicamento = false;
  filtroActivoVeterinario = false;
  filtroActivoFecha = false;

  tratamientos: Tratamiento[] = []; // Cambia el nombre de la propiedad
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];

  constructor(
    private tratamientoService: ServiceService,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) {}

  ngOnInit() {
    this.veterinarioService.getRol().subscribe((rol) => {
      this.rol = rol;
      console.log(this.rol);
    });
    this.getTratamientos(); // Cambia el nombre del método
  }

  getTratamientos() {
    this.tratamientoService.getTratamientos().subscribe((tratamientos) => {
      // Cambia el nombre del método y la variable
      this.tratamientos = tratamientos;
      this.tratamientosFiltrados = this.tratamientos;
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    });
  }

  ordenarTratamientos() {
    this.tratamientosSort = this.tratamientosFiltrados;
    this.tratamientosSort.sort((a, b) => {
      let valueA = [];
      let valueB = [];

      switch (this.selectedSortBy) {
        case 'id':
          valueA = a['id'];
          valueB = b['id'];
          break;

        case 'fecha':
          valueA = a['fecha'];
          valueB = b['fecha'];
          break;

        case 'mascota':
          valueA = a['mascota']['id'];
          valueB = b['mascota']['id'];
          break;

        case 'medicamento':
          valueA = a['medicamento']['id'];
          valueB = b['medicamento']['id'];
          break;

        case 'veterinario':
          valueA = a['veterinario']['nombre'];
          valueB = b['veterinario']['nombre'];
          break;
      }

      if (typeof valueA == 'string' && typeof valueB == 'string') {
        return this.selectedSortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA == 'number' && typeof valueB == 'number') {
        return this.selectedSortOrder === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      } else {
        return 0;
      }
    });
  }

  filtrarTratamientos() {
    if (this.textoBusqueda.trim() === '') {
      // Si el campo de búsqueda está vacío, muestra todos los tratamientos.
      this.tratamientosFiltrados = this.tratamientos;
    } else {
      // Filtra los tratamientos que coinciden con el texto de búsqueda en varios atributos.
      const textoBusquedaLower = this.textoBusqueda.toLowerCase();
      this.tratamientosFiltrados = this.tratamientos.filter((tratamiento) => {
        return (
          tratamiento.id.toString().includes(textoBusquedaLower) ||
          tratamiento.mascota.id.toString().includes(textoBusquedaLower) ||
          tratamiento.medicamento.nombre.toLowerCase().includes(textoBusquedaLower) ||
          tratamiento.veterinario.nombre.toLowerCase().includes(textoBusquedaLower) ||
          tratamiento.fecha.toString().includes(textoBusquedaLower)
        );
      });
  
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    }
  }
  

  restaurarFiltros() {
    this.filtroActivoIdMascota = false;
    this.filtroActivoMedicamento = false;
    this.filtroActivoVeterinario = false;
    this.filtroActivoFecha = false;
    this.calcularPaginas();
    this.actualizarRangoPaginas();
  }

  filtrarPorAtributo(atributo: string) {
    console.log(this.filtroActivoIdMascota)
    if(this.filtroActivoIdMascota == true){
      atributo = 'limpiar'
    }else if(this.filtroActivoMedicamento){
      atributo = 'limpiar'
    }else if(this.filtroActivoVeterinario){
      atributo = 'limpiar'
    }else if(this.filtroActivoFecha){
      atributo = 'limpiar'
    }
    
    if (atributo == 'limpiar') {
      // Limpia el campo de búsqueda avanzada y muestra todos los tratamientos
      this.busquedaAvanzada = '';
      this.restaurarFiltros();
      this.filtrarTratamientos();
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    } else {
      // Filtra los tratamientos que coinciden con el texto de búsqueda y el atributo de búsqueda avanzada.
      this.filtrarTratamientos();

      this.restaurarFiltros();
      if (atributo == 'mascota')
        this.filtroActivoIdMascota = !this.filtroActivoIdMascota;
      else if (atributo == 'medicamento')
        this.filtroActivoMedicamento = !this.filtroActivoMedicamento;
      else if (atributo == 'veterinario')
        this.filtroActivoVeterinario = !this.filtroActivoVeterinario;
      else if (atributo == 'fecha')
        this.filtroActivoFecha = !this.filtroActivoFecha;
      this.tratamientosFiltrados = this.tratamientosFiltrados.filter(
        (tratamiento) => {
          const atributoBusqueda = this.textoBusqueda;
          if (atributo == 'mascota') {
            return tratamiento.mascota.id.toString().includes(atributoBusqueda);
          } else if (atributo == 'medicamento') {
            return tratamiento.medicamento.nombre
              .toLowerCase()
              .includes(atributoBusqueda);
          } else if (atributo == 'veterinario') {
            return tratamiento.veterinario.nombre
              .toLowerCase()
              .includes(atributoBusqueda);
          } else if (atributo == 'fecha') {
            return tratamiento.fecha.toString().includes(atributoBusqueda);
          }
        }
      );
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    }
  }
  eliminarTratamiento(id: number) {
    // Cambia el nombre del método
    this.tratamientoService.eliminarTratamiento(id).subscribe(() => {
      // Cambia el nombre del método
      this.getTratamientos(); // Cambia el nombre del método
    });
  }

  modificarTratamiento(id: number) {
    // Cambia el nombre del método
    this.router.navigate(['/tratamiento/update', id]); // Cambia la redirección
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
    const cantidadPaginas = Math.ceil(
      this.tratamientosFiltrados.length / this.itemsPorPagina
    );
    this.paginas = Array.from(
      { length: cantidadPaginas },
      (_, index) => index + 1
    );
    this.actualizarRangoPaginas();
  }

  actualizarRangoPaginas() {
    const rangoVisible = 2;
    let inicio = Math.max(this.paginaActual - Math.floor(rangoVisible / 2), 1);
    let fin = Math.min(inicio + rangoVisible - 1, this.paginas.length);
    if (fin === this.paginas.length) {
      inicio = Math.max(fin - rangoVisible + 1, 1);
    }
    this.rangoPaginas = Array.from(
      { length: fin - inicio + 1 },
      (_, index) => inicio + index
    );
  }

  cambiarCantidadPorPagina() {
    this.calcularPaginas();
    this.paginaActual = 1; // Vuelve a la primera página al cambiar la cantidad por página
    this.calcularIndicesPagina(); // Actualiza los índices de página
  }
}
