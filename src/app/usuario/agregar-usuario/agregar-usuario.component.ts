import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';  
import { Router } from '@angular/router';
import { UsuarioService } from '../Service/usuarioservice.service';  


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

  constructor(
    private usuarioService: UsuarioService,  
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
  
  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;
      nuevoUsuario.id = 0;
      nuevoUsuario.estado = "activo";
      console.log(nuevoUsuario);
      this.usuarioService.agregarUsuario(nuevoUsuario).subscribe(() => {
          this.router.navigate(['usuario/all']);
      });
    } else {
      this.mostrarError();
    }
  }
  
  
  mostrarError() {
    this.showError = true; // Mostrar el mensaje de error al hacer clic en el botón.
  }
}
