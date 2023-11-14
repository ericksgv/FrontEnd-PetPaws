import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinarioService } from '../Service/veterinario-service.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

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


    ngOnInit() {
      this.veterinarioService.verificarPermisosAdd().pipe(
        catchError((error) => {
          let errorMessage = 'Ocurrió un error.';
    
          if (error.status === 401) {
            errorMessage = 'Error de autorización. Redirigiendo a la página de inicio de sesión.';
            this.router.navigate(['unauthorized']);
          } else if (error.status === 403) {
            errorMessage = 'Acceso prohibido. Redirigiendo a la página prohibida.';
            // Aquí puedes redirigir o manejar de alguna manera específica para el error 403
            // Por ejemplo, mostrar un mensaje al usuario
            console.error(errorMessage);
            this.router.navigate(['forbidden']);
          } else {
            console.error('Ocurrió un error:', error);
            // Puedes agregar más lógica aquí para manejar otros tipos de errores si es necesario.
          }
    
          // Emitir un valor personalizado que representa el error
          return of({ error: errorMessage });
        })
      ).subscribe((result) => {
          // La lógica para el caso de éxito
          console.log('Éxito:', result);

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

