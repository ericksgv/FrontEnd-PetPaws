import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {Mascota} from "../../model/mascota";
import { Tratamiento } from 'src/app/model/tratamiento';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../tratamiento/Service/service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Veterinario } from 'src/app/model/veterinario';
import {LogicalFileSystem} from "@angular/compiler-cli";

@Component({
  selector: 'app-dashboard-veterinario',
  templateUrl: './dashboard-veterinario.component.html',
  styleUrls: ['./dashboard-veterinario.component.css']
})
export class DashboardVeterinarioComponent {
  usuarioActual: Usuario | undefined
  mascotasUsuario: Mascota[] | undefined
  tratamientos: Tratamiento[] = [];
  cedula: any;
  nombreUsuario: string | undefined;

  constructor(private tratamientoService: ServiceService, private veterinarioService: VeterinarioService, private route: ActivatedRoute) {}



  ngOnInit() {
    // Obtener la cédula de la URL
    this.route.params.subscribe((params) => {
      this.cedula = params['cedula'];
      console.log(this.cedula);
      this.mostrarveterinario();
    });
  }
  mostrarveterinario() {
    this.veterinarioService.getVeterinarioPorCedula(this.cedula).subscribe(
      (veterinario: Veterinario | undefined) => {
        if (veterinario) {
          console.log(veterinario)

          // Guarda el ID del veterinario
          const idVeterinario = veterinario.id;
          this.nombreUsuario = veterinario.nombre;

          this.cargarTratamientos(idVeterinario);
        } else {

        }
      }
    );
  }

  cargarTratamientos(idVeterinario: number) {
    this.tratamientoService.mostrarveterinario(idVeterinario).subscribe(
      (tratamientos) => {
        this.tratamientos = tratamientos;
      }
    );
  }
  calcularEdadMascota(edad: number): { anos: number, meses: number } {
    const anos = Math.floor(edad / 12);
    const meses = edad % 12;
    return { anos, meses };
  }
}
