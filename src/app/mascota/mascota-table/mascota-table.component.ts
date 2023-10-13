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
  mascotas: Mascota[] = [];
  itemsPorPagina: number = 15; 
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1; 
  rangoPaginas: number[] = [];
  mascotasSort: any[] = [];

  constructor(private mascotaService: MascotaService, private router: Router) { }

  ngOnInit() {
    this.getMascotas();
  }

  ordenarVeterinarios() {
    this.mascotasSort = this.mascotas;
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

  getMascotas() {
    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
      this.calcularPaginas(); 
      this.actualizarRangoPaginas();
    });
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
    const cantidadPaginas = Math.ceil(this.mascotas.length / this.itemsPorPagina);
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



