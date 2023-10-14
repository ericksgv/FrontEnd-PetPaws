import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from '../Service/mascotaservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent implements OnInit {
  selectedSortBy: string = 'nombre'; // Valor predeterminado
  selectedSortOrder: string = 'asc'; // Valor predeterminado
  textoBusqueda: string = '';
  
  filtroActivoE = false;
  filtroActivoR = false;
  filtroActivoP = false;
  filtroActivoEs = false;
  filtroActivoL = false;

  busquedaAvanzada: string = ''; // Variable para el atributo de búsqueda avanzada
  mascotas: Mascota[] = [];
  mascotasFiltradas: any[] = [];
  mascotasFiltradasA: any[] = [];
  itemsPorPagina: number = 10; 
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1; 
  rangoPaginas: number[] = [];
  mascotasSort: any[] = [];

  constructor(private mascotaService: MascotaService, private router: Router) { }

  ngOnInit() {
    this.getMascotas();
  }

  ordenarMascotas() {
    this.mascotasSort = this.mascotasFiltradas;
    this.mascotasSort.sort((a, b) => {
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
  

  getMascotas() {
    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
      this.mascotasFiltradas = mascotas;
      this.calcularPaginas(); 
      this.actualizarRangoPaginas();
    });
  }
  
filtrarMascotas() {
  if (this.textoBusqueda.trim() === '') {
    // Si el campo de búsqueda está vacío, muestra todas las mascotas.
    this.mascotasFiltradas = this.mascotas;
  } else {
    // Filtra las mascotas que coinciden con el texto de búsqueda.
    this.mascotasFiltradas = this.mascotas.filter(mascota => mascota.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()));
    this.calcularPaginas();
    this.actualizarRangoPaginas();
  }
}

restaurarFiltros(){
  this.filtroActivoE = false;
  this.filtroActivoR = false;
  this.filtroActivoP = false;
  this.filtroActivoEs = false;
}

filtrarPorAtributo(atributo: string) {
  if (atributo === 'limpiar') {
    // Limpia el campo de búsqueda avanzada y muestra todas las mascotas.
    this.busquedaAvanzada = '';
    this.restaurarFiltros();
    this.filtrarMascotas();
  } else {
    // Filtra las mascotas que coinciden con el texto de búsqueda y el atributo de búsqueda avanzada.
    this.filtrarMascotas();
    this.mascotasFiltradas = this.mascotasFiltradas.filter(mascota => {
      const atributoBusqueda = this.busquedaAvanzada;
      if (atributo === 'edad') {
        this.restaurarFiltros();
        this.filtroActivoE = !this.filtroActivoE;
        return mascota.edad.toString().includes(atributoBusqueda);
      } else if (atributo === 'raza') {
        this.restaurarFiltros();
        this.filtroActivoR = !this.filtroActivoR;
        return mascota.raza.toLowerCase().includes(atributoBusqueda);
      } else if (atributo === 'peso') {
        this.restaurarFiltros();
        this.filtroActivoP = !this.filtroActivoP;
        return mascota.peso.toString().includes(atributoBusqueda);
      } else if (atributo === 'estado') {
        this.restaurarFiltros();
        this.filtroActivoEs = !this.filtroActivoEs;
        return mascota.estado.toLowerCase().includes(atributoBusqueda);
      }
    });
  }

    this.calcularPaginas();
    this.actualizarRangoPaginas();
  
}



  eliminarMascota(id: number) {
    this.mascotaService.eliminarMascota(id).subscribe(() => {
      this.getMascotas();
    });
  }

  modificarMascota(id: number) {
    this.router.navigate(['/mascotas/modificar', id]);
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
    const cantidadPaginas = Math.ceil(this.mascotasFiltradas.length / this.itemsPorPagina);
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



