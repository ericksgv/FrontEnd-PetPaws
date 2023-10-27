import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Veterinario } from 'src/app/model/veterinario';
import { Mascota } from 'src/app/model/mascota';
import { Medicamento } from 'src/app/model/medicamento';
import { MascotaService } from 'src/app/mascota/Service/mascotaservice.service';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { MedicamentoService } from 'src/app/medicamento/Service/medicamento.service';

@Component({
  selector: 'app-agregar-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.css']
})
export class AgregarTratamientoComponent implements OnInit {
  mascotas: Mascota[] = [];
  veterinarios: Veterinario[] = [];
  medicamentos: Medicamento[] = [];
  tratamientoForm: FormGroup;

  constructor(
    private tratamientoService: ServiceService,
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private medicamentoService: MedicamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.tratamientoForm = this.formBuilder.group({
      mascotaId: ['', Validators.required],
      veterinarioId: ['', Validators.required],
      medicamentoId: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [this.obtenerFechaActual()],
      // Agrega otros campos del formulario y sus validaciones si es necesario
    });

    this.veterinarioService.getVeterinarios().subscribe((veterinarios) => {
      this.veterinarios = veterinarios;
    });

    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
    });

    this.medicamentoService.getMedicamentosMayorCero().subscribe((medicamentos) => {
      this.medicamentos = medicamentos;
    });
  }


  ngOnInit() {
    this.tratamientoForm = this.formBuilder.group({
      mascotaId: ['', Validators.required],
      veterinarioId: ['', Validators.required],
      medicamentoId: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [this.obtenerFechaActual()],
      // Agrega otros campos del formulario y sus validaciones si es necesario
    });

    this.veterinarioService.getVeterinarios().subscribe((veterinarios) => {
      this.veterinarios = veterinarios;
    });

    this.mascotaService.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
    });

    this.medicamentoService.getMedicamentosMayorCero().subscribe((medicamentos) => {
      this.medicamentos = medicamentos;
    });
  }

  buscarMascotaPorNombre(event: any) {
    const nombre = event.target.value;

    if (nombre == '' || nombre == null) {
      this.mascotaService.getMascotas().subscribe((m) => {
        this.mascotas = m;
      });
    } else {
      this.mascotaService.buscarMascotasPorNombre(nombre).subscribe((mascotas) => {
        this.mascotas = mascotas;
      });
    }
  }

  buscarMedicamentoPorNombre(event: any) {
    const nombre = event.target.value;

    if (nombre == '' || nombre == null) {
      this.medicamentoService.getMedicamentosMayorCero().subscribe((m) => {
        this.medicamentos = m;
      });
    } else {
      this.medicamentoService.buscarMedicamentosPorNombre(nombre).subscribe((medicamentos) => {
        this.medicamentos = medicamentos;
      });
    }
  }

  buscarVeterinario(event: any) {
    const veterinarioData = event.target.value;

    if (veterinarioData == '' || veterinarioData == null) {
      this.veterinarioService.getVeterinarios().subscribe((v) => {
        this.veterinarios = v;
      });
    } else {
      this.veterinarioService.buscarVeterinarioFiltro(veterinarioData).subscribe((veterinarios) => {
        this.veterinarios = veterinarios;
      });
    }
  }

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

  guardarTratamiento() {
    const tratamiento = this.tratamientoForm.value;
    console.log(tratamiento);
    this.tratamientoService.agregarTratamiento(tratamiento).subscribe(() => {
      this.router.navigate(['tratamiento/all']);
    });
  }
}
