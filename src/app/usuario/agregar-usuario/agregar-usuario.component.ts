import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { UsuarioService } from '../Service/usuarioservice.service';  

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  usuarioForm: FormGroup;  
  id: number | undefined;

  constructor(
    private usuarioService: UsuarioService,  
    private router: Router,
    private formBuilder: FormBuilder  
  ) {
    this.usuarioForm = this.formBuilder.group({
      id: [  , ],
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required]
    });
  }

  agregarUsuario() {
    const nuevoUsuario = this.usuarioForm.value;
    nuevoUsuario.id=0;
    nuevoUsuario.estado="activo";
    console.log(nuevoUsuario);
    this.usuarioService.agregarUsuario(nuevoUsuario).subscribe(() => {
      this.router.navigate(['usuario/all']);  
    })
  }
}

