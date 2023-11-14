import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from '../Service/mascotaservice.service';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent implements OnInit {
  selectedSortBy: string = 'nombre'; // Valor predeterminado
  selectedSortOrder: string = 'asc'; // Valor predeterminado
  textoBusqueda: string = '';
  rol: String = '';

  filtroActivoNombre = false;
  filtroActivoEdad = false;
  filtroActivoRaza = false;
  filtroActivoPeso = false;
  filtroActivoEstado = false;

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

  constructor(private mascotaService: MascotaService, private veterinarioService: VeterinarioService, private router: Router) { }

  ngOnInit() {
    this.veterinarioService.getRol().subscribe(rol => {
      this.rol = rol;
      console.log(this.rol)
    });

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
    this.mascotaService.getMascotas()
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
    .subscribe((mascotas) => {
      this.mascotas = mascotas ?? [];
      this.mascotasFiltradas = mascotas ?? [];
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
    this.mascotasFiltradas = this.mascotas.filter((mascota) => {
      return (

        mascota.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        mascota.edad.toString().includes(this.textoBusqueda.toLowerCase()) ||
        mascota.raza.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        mascota.peso.toString().includes(this.textoBusqueda.toLowerCase()) ||
        mascota.estado.toLowerCase().includes(this.textoBusqueda.toLowerCase())        
      );
    });

    
    this.calcularPaginas();
    this.actualizarRangoPaginas();
  }
}

restaurarFiltros(){
  this.filtroActivoNombre = false;
  this.filtroActivoEdad = false;
  this.filtroActivoRaza = false;
  this.filtroActivoPeso = false;
  this.filtroActivoEstado = false;
  this.calcularPaginas();
  this.actualizarRangoPaginas();
}

filtrarPorAtributo(atributo: string) {
  this.filtrarMascotas();
  if(this.filtroActivoNombre  == true){
    atributo = 'limpiar'
  } else
  if(this.filtroActivoEdad  == true){
    atributo = 'limpiar'
  } else if(this.filtroActivoRaza  == true){
    atributo = 'limpiar'
  } else if(this.filtroActivoPeso  == true){
    atributo = 'limpiar'
  } else if(this.filtroActivoEstado  == true){
    atributo = 'limpiar'
  }
  this.restaurarFiltros();


  if (atributo === 'limpiar') {
    // Limpia el campo de búsqueda avanzada y muestra todas las mascotas.
    this.busquedaAvanzada = '';
  } else {
    // Filtra las mascotas que coinciden con el texto de búsqueda y el atributo de búsqueda avanzada.
    this.mascotasFiltradas = this.mascotas.filter(mascota => {
      const atributoBusqueda = this.textoBusqueda.toLowerCase();
      switch (atributo) {
        case 'nombre':
          this.filtroActivoNombre = true;
          return mascota.nombre.toLowerCase().includes(atributoBusqueda);
        case 'edad':
          this.filtroActivoEdad = true;
          console.log(this.filtroActivoEdad);
          return mascota.edad.toString().includes(atributoBusqueda);
        case 'raza':
          this.filtroActivoRaza = true;
          return mascota.raza.toLowerCase().includes(atributoBusqueda);
        case 'peso':
          this.filtroActivoPeso = true;
          return mascota.peso.toString().includes(atributoBusqueda);
        case 'estado':
          this.filtroActivoEstado = true;
          return mascota.estado.toLowerCase().includes(atributoBusqueda);
        default:
          return true; 
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

  activarMascota(id: number) {
    this.mascotaService.activarMascota(id).subscribe(() => {
      this.getMascotas();
    });
  }

  toggleEstadoMascota(mascota: any) {
    if (mascota.estado != 'Inactivo') {
      this.eliminarMascota(mascota.id);
    } else if (mascota.estado === 'Inactivo') {
      this.activarMascota(mascota.id);
    }
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



