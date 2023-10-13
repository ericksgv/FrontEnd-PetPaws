import { Component, OnInit } from '@angular/core';
import { Veterinario } from 'src/app/model/veterinario'; // Importa la clase Veterinario adecuada
import { ServiceService } from '../Service/service.service'; // Importa el servicio de veterinarios
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.css']
})
export class VeterinarioTableComponent implements OnInit {
  veterinarios: Veterinario[] = [];
  itemsPorPagina: number = 15;
  paginaActual: number = 1;
  paginas: number[] = [];
  indicePaginaActual: number = 1;
  rangoPaginas: number[] = [];

  constructor(private veterinarioService: ServiceService, private router: Router) {}

  ngOnInit() {
    this.getVeterinarios();
  }

  getVeterinarios() {
    this.veterinarioService.getVeterinarios().subscribe((veterinarios) => {
      this.veterinarios = veterinarios;
      console.log(this.veterinarios);
      this.calcularPaginas();
      this.actualizarRangoPaginas();
    });
  }

  eliminarVeterinario(id: number) {
    this.veterinarioService.eliminarVeterinario(id).subscribe(() => {
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
    const cantidadPaginas = Math.ceil(this.veterinarios.length / this.itemsPorPagina);
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

