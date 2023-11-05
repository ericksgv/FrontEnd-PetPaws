import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importar FormGroup y FormBuilder
import { Router } from '@angular/router';
import { MascotaService } from '../Service/mascotaservice.service';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/usuario/Service/usuarioservice.service';
import Swal from 'sweetalert2';
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


  constructor(
    private mascotaService: MascotaService,
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
