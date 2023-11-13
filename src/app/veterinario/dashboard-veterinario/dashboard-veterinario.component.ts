import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { FormControl, FormGroup } from '@angular/forms';
import { Mascota } from '../../model/mascota';
import { Tratamiento } from 'src/app/model/tratamiento';
import { HttpClient } from '@angular/common/http';

import { ServiceService } from '../../tratamiento/Service/service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogicalFileSystem } from '@angular/compiler-cli';

@Component({
  selector: 'app-dashboard-veterinario',
  templateUrl: './dashboard-veterinario.component.html',
  styleUrls: ['./dashboard-veterinario.component.css'],
})
export class DashboardVeterinarioComponent {
  @Input()
  veterinarioActual!: Veterinario;
  usuarioActual: Usuario | undefined;
  mascotasUsuario: Mascota[] | undefined;
  tratamientos: Tratamiento[] = [];
  cedula: any;
  nombreUsuario: string | undefined;

  constructor(
    private router: Router, // Inyecta el servicio Router
    private tratamientoService: ServiceService,
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /*
    // Obtener la cédula de la URL
    this.route.params.subscribe((params) => {
      this.cedula = params['cedula'];
      console.log(this.cedula);
      this.mostrarveterinario();
    });
    */
    localStorage.removeItem('paginaAnterior');
    this.veterinarioService
      .veterinarioHome()
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Handle the 401 Unauthorized error here, e.g., navigate to a login page
            // or show an error message to the user.
            console.log('Unauthorized error. Redirecting to login page.');
            this.router.navigate(['unauthorized']);
          } else if (error.status == 403) {
            // Handle the 401 Unauthorized error here, e.g., navigate to a login page
            // or show an error message to the user.
            console.log("Error status: " + error.status)
            console.log('Unauthorized error. Redirecting to login page.');
            this.router.navigate(['forbidden']);
          }
          return of(null); // Return an empty observable to avoid further error propagation.
        })
      )
      .subscribe((data) => {
        if (data) {
          this.veterinarioActual = data;
          this.nombreUsuario = this.veterinarioActual.nombre;

          this.cargarTratamientos(this.veterinarioActual.id);

        }
      });
  }


  cargarTratamientos(idVeterinario: number) {
    this.tratamientoService
      .mostrarveterinario(idVeterinario)
      .subscribe((tratamientos) => {
        this.tratamientos = tratamientos;
      });
  }
  calcularEdadMascota(edad: number): { anos: number; meses: number } {
    const anos = Math.floor(edad / 12);
    const meses = edad % 12;
    return { anos, meses };
  }
}
