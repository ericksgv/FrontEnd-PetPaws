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

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    const cedula = this.route.snapshot.paramMap.get('cedula');
    if (cedula) {
      const cedulaNumero = parseInt(cedula, 10); // Convertir cédula a número
      this.usuarioService.getUsuarioPorCedula(cedulaNumero).subscribe((usuario: Usuario | undefined) => {
        this.usuario = usuario
        if (usuario) {
          // Establece los valores del formulario con los datos del usuario encontrado
          this.usuarioForm.setValue({
            cedula: 12012, // Usar el número en lugar de la cadena
            nombre: usuario.nombre,
            correo: usuario.correo,
            celular: usuario.celular.toString() // Convierte a string para mostrarlo en el campo de entrada
          });
        } else {
          this.router.navigate(['/usuarios/all']);
        }
      });
    }
  }

  modificarUsuario() {
    if (this.usuarioForm.valid && this.usuario) {
      const usuarioModificado = this.usuarioForm.value;
      const id = this.usuario.id
      // Convierte el valor de 'celular' de string a número si es necesario
      usuarioModificado.celular = parseInt(usuarioModificado.celular, 10);

      // Llama al servicio para modificar el usuario
      this.usuarioService.modificarUsuario(id, usuarioModificado).subscribe(() => {
        this.router.navigate(['/usuarios/all']);
      });
    }
  }
}
