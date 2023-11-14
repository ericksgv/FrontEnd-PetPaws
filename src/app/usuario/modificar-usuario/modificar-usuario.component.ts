import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../Service/usuarioservice.service';
import { Usuario } from 'src/app/model/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Mascota} from "../../model/mascota";
import Swal from 'sweetalert2';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

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
  rol: String = '';

  constructor(
    private usuarioService: UsuarioService,
    private veterinarioService: VeterinarioService,
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
      estado: [''],
    });

    this.route.params.subscribe(params => {
      this.cedula = +params['id']
    })
  }

  ngOnInit(): void {

    
      this.veterinarioService.getRol().subscribe((rol) => {
        this.rol = rol;
        console.log(this.rol);
      });
    

    console.log("Cedula de la url: ", this.cedula)
    if (this.cedula) {
      this.usuarioService.getUsuarioPorCedula(this.cedula)
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
  .subscribe({
    next: (usuario: Usuario | null | undefined) => {
      this.usuario = usuario ?? undefined;
      if (usuario) {
        // Establece los valores del formulario con los datos del usuario encontrado
        this.usuarioForm.setValue({
          id: usuario.id,
          cedula: usuario.cedula, // Usar el número en lugar de la cadena
          nombre: usuario.nombre,
          correo: usuario.correo,
          celular: usuario.celular.toString(), 
          estado: usuario.estado,
        });
      } else {
        this.router.navigate(['/usuario/all']);
      }
    }
  });

    }
  }

  modificarUsuario() {
    if (this.usuarioForm.valid && this.usuario) {
      const usuarioModificado = this.usuarioForm.value;
      this.usuarioService.modificarUsuario(this.cedula, usuarioModificado).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Usuario modificado exitosamente',
          timer: 2000, 
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['/usuario/all']);
        });
      });
    }
  }
}
