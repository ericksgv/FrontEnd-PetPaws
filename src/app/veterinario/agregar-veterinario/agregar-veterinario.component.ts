import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinarioService } from '../Service/veterinario-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-veterinario',
  templateUrl: './agregar-veterinario.component.html',
  styleUrls: ['./agregar-veterinario.component.css']
})
export class AgregarVeterinarioComponent  {
  veterinarioForm: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private veterinarioService: VeterinarioService
    ) {
      this.veterinarioForm = this.formBuilder.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        passwordHash: ['', Validators.required],
        especialidad: ['', Validators.required],
        numeroAtenciones: ['', Validators.required],
        foto: ['']
      });
    }


    agregarVeterinario() {
      const veterinario = this.veterinarioForm.value;
      veterinario.estado = "activo";
  
      this.veterinarioService.agregarVeterinario(veterinario).subscribe(
        (data) => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Veterinario agregado exitosamente',
          timer: 2000, 
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['veterinario/all']);
        });
      },
      (error) => {
        console.log(error.error);
      });
    }
  }
