import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importar FormGroup y FormBuilder
import { Router } from '@angular/router';
import { MascotaService } from '../Service/mascotaservice.service';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {
  mascotaForm: FormGroup;  // Definir el formulario

  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private formBuilder: FormBuilder  // Inyectar el FormBuilder
  ) {
    this.mascotaForm = this.formBuilder.group({
      duenoId: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      foto: [''],
      raza: [''],
      enfermedad: [''],
      peso: ['', Validators.required],
      estado: ['Sin estado']
    });
  }

  agregarMascota() {
    const nuevaMascota = this.mascotaForm.value;

    this.mascotaService.agregarMascota(nuevaMascota);

    this.router.navigate(['/mascotas/all']);
  }
}
