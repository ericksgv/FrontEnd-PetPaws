import { Component, OnInit } from '@angular/core';
import { Tratamiento } from 'src/app/model/tratamiento'; 
import { ServiceService } from '../Service/service.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.css']
})
export class TratamientoTableComponent implements OnInit{
  tratamientos: Tratamiento[] = []; // Cambia el nombre de la propiedad
  itemsPorPagina: number = 15;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];

  constructor(private tratamientoService: ServiceService, private router: Router) {}

  ngOnInit() {
    this.getTratamientos(); // Cambia el nombre del método
  }

  getTratamientos() {
    this.tratamientoService.getTratamientos().subscribe((tratamientos) => { // Cambia el nombre del método y la variable
      this.tratamientos = tratamientos;
      console.log(this.tratamientos);
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    });
  }

  eliminarTratamiento(id: number) { // Cambia el nombre del método
    this.tratamientoService.eliminarTratamiento(id).subscribe(() => { // Cambia el nombre del método
      this.getTratamientos(); // Cambia el nombre del método
    });
  }

  modificarTratamiento(id: number) { // Cambia el nombre del método
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
    const cantidadPaginas = Math.ceil(this.tratamientos.length / this.itemsPorPagina);
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
