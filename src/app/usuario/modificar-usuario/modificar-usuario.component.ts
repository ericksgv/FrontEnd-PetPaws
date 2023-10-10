import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../Service/usuarioservice.service';
import { Usuario } from 'src/app/model/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Mascota} from "../../model/mascota";

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: Usuario | undefined;
  cedula: number | undefined;
  celular: number | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      id: ['', ],
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: [, Validators.required],
    });

    this.route.params.subscribe(params => {
      this.cedula = +params['id']
    })
  }

  ngOnInit(): void {

    console.log("Cedula de la url: ", this.cedula)
    if (this.cedula) {
      this.usuarioService.getUsuarioPorCedula(this.cedula).subscribe((usuario: Usuario | undefined) => {
        this.usuario = usuario
        if (usuario) {
          // Establece los valores del formulario con los datos del usuario encontrado
          this.usuarioForm.setValue({
            id: usuario.id,
            cedula: usuario.cedula, // Usar el número en lugar de la cadena
            nombre: usuario.nombre,
            correo: usuario.correo,
            celular: usuario.celular.toString(), // Convierte a string para mostrarlo en el campo de entrada
          });
        } else {
          this.router.navigate(['/usuario/all']);
        }
      });
    }
  }

  modificarUsuario() {
    if (this.usuarioForm.valid && this.usuario) {
      const usuarioModificado = this.usuarioForm.value;
      // Llama al servicio para modificar el usuario
      this.usuarioService.modificarUsuario(this.cedula, usuarioModificado).subscribe(() => {
        this.router.navigate(['/usuario/all']);
      });
    }
  }
}
