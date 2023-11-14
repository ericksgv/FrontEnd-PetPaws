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
import Swal from 'sweetalert2';
import { TratamientoCrearDTO } from 'src/app/model/tratamientoCrearDTO';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
@Component({
  selector: 'app-agregar-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.css'],
})
export class AgregarTratamientoComponent implements OnInit {
  mascotas: Mascota[] = [];
  veterinarios: Veterinario[] = [];
  medicamentos: Medicamento[] = [];
  tratamientoForm: FormGroup;
  rol: String = '';
  veterinarioActual: Veterinario | undefined;

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

    this.medicamentoService
      .getMedicamentosMayorCero()
      .subscribe((medicamentos) => {
        this.medicamentos = medicamentos;
      });
  }

  ngOnInit() {
    this.tratamientoService.verificarPermisosAdd().pipe(
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
        }
        // Emitir un valor personalizado que representa el error
        return of(null);
      })
    ).subscribe((result) => {


        // La lógica para el caso de éxito
        console.log('Éxito:', result);
        this.veterinarioService.getRol().subscribe((rol) => {
          this.rol = rol;
          console.log(this.rol);
        });

        this.veterinarioService
      .veterinarioHome()
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.tratamientoForm.get('veterinarioId')?.setValue(data.cedula.toString());

          this.veterinarioActual = data;

        }
      });

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
    
        this.medicamentoService
          .getMedicamentosMayorCero()
          .subscribe((medicamentos) => {
            this.medicamentos = medicamentos;
          });
    });
    

  }

  buscarMascotaPorNombre(event: any) {
    const nombre = event.target.value;

    if (nombre == '' || nombre == null) {
      this.mascotaService.getMascotas().subscribe((m) => {
        this.mascotas = m;
      });
    } else {
      this.mascotaService
        .buscarMascotasPorNombre(nombre)
        .subscribe((mascotas) => {
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
      this.medicamentoService
        .buscarMedicamentosPorNombre(nombre)
        .subscribe((medicamentos) => {
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
      this.veterinarioService
        .buscarVeterinarioFiltro(veterinarioData)
        .subscribe((veterinarios) => {
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
    // Verifica si el formulario es válido
    
    if (this.tratamientoForm.valid) {
      const tratamiento: TratamientoCrearDTO = this.tratamientoForm.value;
      console.log('guardando', tratamiento);
  
      this.tratamientoService.agregarTratamiento(tratamiento).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Tratamiento Agregado exitosamente',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['tratamiento/all']);
        });
      });
    } else {
      // Si el formulario no es válido, muestra un mensaje de error o realiza alguna acción
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, complete todos los campos obligatorios.',
      });
    }
  }
  
}
