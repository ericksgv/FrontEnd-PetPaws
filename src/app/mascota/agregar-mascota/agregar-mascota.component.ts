import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importar FormGroup y FormBuilder
import { Router } from '@angular/router';
import { MascotaService } from '../Service/mascotaservice.service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/usuario/Service/usuarioservice.service';
import Swal from 'sweetalert2';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {
  mascotaForm: FormGroup; //Define el formulario
  usuarios: Usuario[] = []; // Almacena la lista de usuarios
  cedulaUsuario: number | undefined; // Almacena la cédula del usuario seleccionado
  mostrarError: boolean = false;
  rol: String =''


  constructor(
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.mascotaForm = this.formBuilder.group({
      duenoId: ['', [Validators.required]], // Añade Validators.required
      nombre: ['', [Validators.required]], // Añade Validators.required
      edad: ['', [Validators.required]], // Añade Validators.required
      foto: ['', [Validators.required]], // Añade Validators.required
      raza: ['', [Validators.required]], // Añade Validators.required
      enfermedad: ['', [Validators.required]], // Añade Validators.required
      peso: ['', [Validators.required, Validators.min(0.01)]], // Añade Validators.required y Validators.min
      estado: ['Sin estado', [Validators.required]], // Añade Validators.required
    });

    this.usuarioService.getUsuarios().subscribe((u) => {
      this.usuarios = u;
    });
  }
  
  ngOnInit() {
    this.mascotaService.verificarPermisosAdd().pipe(
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
        this.veterinarioService.getRol().subscribe(rol => {
          this.rol = rol;
        });
        console.log("ROL: " + this.rol)

    });

 
  }

  buscarUsuariosPorCedula(event: any) {
    const cedula = event.target.value;
    
    if (cedula == '' || cedula == null) {
      // Si la cédula está vacía, muestra todos los usuarios
      this.usuarioService.getUsuarios().subscribe((u) => {
        this.usuarios = u;
      });
    } else {
      this.usuarioService.buscarUsuariosPorCedula(cedula).subscribe((usuarios) => {
        this.usuarios = usuarios;
      });
    }
  }
  

// Agrega un método para asignar el dueño seleccionado a la mascota
seleccionarDueno(duenoCedula: number) {
  this.cedulaUsuario = duenoCedula;
}

agregarMascota() {
  if (this.mascotaForm.valid) {
    const nuevaMascota = this.mascotaForm.value;
    const cedula = this.mascotaForm.value.duenoId;

    this.mascotaService.agregarMascota(nuevaMascota, cedula).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'CRUD Exitoso',
        text: 'Mascota agregada exitosamente',
        timer: 2000, 
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then(() => {
        this.router.navigate(['/mascotas/all']);
      });
    });
  } else {
    this.mostrarError = true;
  }
}
}
