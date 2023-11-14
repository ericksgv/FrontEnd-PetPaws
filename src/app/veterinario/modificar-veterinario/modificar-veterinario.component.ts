import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from '../Service/veterinario-service.service';
import { Veterinario } from '../../model/veterinario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
@Component({
  selector: 'app-modificar-veterinario',
  templateUrl: './modificar-veterinario.component.html',
  styleUrls: ['./modificar-veterinario.component.css']
})
export class ModificarVeterinarioComponent implements OnInit {
  veterinarioForm: FormGroup;
  veterinario: Veterinario | undefined;
  cedula: number | undefined;

  constructor(
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.veterinarioForm = this.fb.group({
      id: [''],
      estado: [''],
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      numeroAtenciones: ['', Validators.required],
      foto: ['']
    });

    this.route.params.subscribe(params => {
      this.cedula = +params['id'];
    });
  }

  ngOnInit(): void {
    if (this.cedula) {
      this.veterinarioService.getVeterinarioPorCedula(this.cedula)
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
      .subscribe((veterinario: Veterinario | null) => {
        if (veterinario !== null && veterinario !== undefined) {
          this.veterinario = veterinario;
          this.veterinarioForm.setValue({
            id: veterinario.id,
            cedula: veterinario.cedula,
            nombre: veterinario.nombre,
            especialidad: veterinario.especialidad,
            numeroAtenciones: veterinario.numeroAtenciones,
            foto: veterinario.foto,
            estado: veterinario.estado,
          });
        } else {
          this.router.navigate(['/veterinario/all']);
        }
      });
    
  } else {
    this.router.navigate(['/veterinario/all']);
  }
}

  modificarVeterinario() {
    if (this.veterinarioForm.valid && this.veterinario) {
      const veterinarioModificado = this.veterinarioForm.value;
      this.veterinarioService.actualizarVeterinario(this.cedula, veterinarioModificado).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Veterinario modificado exitosamente',
          timer: 2000, 
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['/veterinario/all']);
        });
      });
    } else {
      console.error("La cédula es indefinida o el formulario no es válido.");
    }
  }
}
