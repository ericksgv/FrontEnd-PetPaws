import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';  
import { Router } from '@angular/router';
import { UsuarioService } from '../Service/usuarioservice.service';  
import Swal from 'sweetalert2';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

// Función de validación personalizada para el formato de correo electrónico
export function EmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
  // Expresión regular para validar el formato del correo electrónico
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (control.value && !control.value.match(emailPattern)) {
    return { 'invalidEmail': true };
  }

  return null;
}

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  usuarioForm: FormGroup;  
  id: number | undefined;
  showError: boolean = false;
  message: string = ''; 
  rol: string = ''; 

  constructor(
    private usuarioService: UsuarioService,  
    private veterinarioService: VeterinarioService,
    private router: Router,
    private formBuilder: FormBuilder, 
  ) {
    this.usuarioForm = this.formBuilder.group({
      id: [null],
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, EmailValidator]], // Usar la validación personalizada
      celular: ['', Validators.required]
    });
  }
  
  ngOnInit() {

    this.usuarioService.verificarPermisosAdd().pipe(
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
        }
  
        // Emitir un valor personalizado que representa el error
        return of({ error: errorMessage });
      })
    ).subscribe((result) => {
        this.veterinarioService.getRol().subscribe((rol) => {
          this.rol = rol;
          console.log(this.rol);
        });
    });


  }
  
  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;
      nuevoUsuario.id = 0;
      nuevoUsuario.estado = "activo";
      console.log(nuevoUsuario);
  
      this.usuarioService.agregarUsuario(nuevoUsuario).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Usuario agregado exitosamente',
          timer: 2000, 
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['usuario/all']);
        });
      });
    } else {
      this.mostrarError();
    }
  }
  
  
  mostrarError() {
    this.showError = true; // Mostrar el mensaje de error al hacer clic en el botón.
  }
}
