import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importar FormGroup y FormBuilder
import { Router } from '@angular/router';
//import { UsuarioService } from '../Service/usuarioservice.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent   {
    usuarioForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.usuarioForm = this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        correo: ['', Validators.required],
        celular: ['', Validators.required]
      });
    }
  
    agregarUsuario() {
      // Aquí puedes agregar la lógica para procesar el formulario
    }
}

