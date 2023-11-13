import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {VeterinarioService} from "../../veterinario/Service/veterinario-service.service";
import {catchError} from "rxjs";
import { LoginModel } from 'src/app/model/loginModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sesion-veterinario',
  templateUrl: './sesion-veterinario.component.html',
  styleUrls: ['./sesion-veterinario.component.css', '../../../styles.css']
})
export class SesionVeterinarioComponent {
  cedula: string = '';
  password: string = '';
  cedulaString: string = '-1'

  vetInactivo: boolean = false
  encontrado: boolean = true
  userRole: string | undefined;

  camposForm: FormGroup = new FormGroup({
      campoCedula: new FormControl('', [Validators.required]),
      campoContrasena: new FormControl ('', Validators.required)
    }
  )

  constructor(private router: Router, private http: HttpClient, private vetService: VeterinarioService, private veterinarioService: VeterinarioService) { }
  ngOnInit() {


    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('token');

    if (token) {
      this.veterinarioService.getRol().subscribe((rol) => {
        this.userRole = rol;
        console.log(this.userRole);
        // Si es administrador mostrar los botones de agregar y eliminar
        if (this.userRole == 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        }
        // Si es veterinario mostrar los botones de agregar y eliminar
        else if (this.userRole == 'VETERINARIO') {
          this.router.navigate(['/veterinario/dashboard']);
        }

        // Si es usuario mostrar los botones de agregar y eliminar
        else if (this.userRole == 'CLIENTE') {
          this.router.navigate(['/usuario/dashboard']);
        }
      });
    }

}
  login() {
    this.cedulaString = this.camposForm.get('campoCedula')?.value;
    this.password = this.camposForm.get('campoContrasena')?.value;
    const infoLogin = new LoginModel(Number(this.cedulaString), this.password);
  
    this.vetService.login(infoLogin).pipe(
      catchError((error) => {
        this.encontrado = false;
        console.error('Vet no encontrado. Error:', error);
        return [];
      })
    ).subscribe((datosVeterinario) => {
      if (datosVeterinario == null) {
        this.encontrado = false;
      }
  
      if (datosVeterinario != null) {
        //this.vetService.guardarVeterinarioEnLocalStorage(datosVeterinario);
        localStorage.setItem('token', String(datosVeterinario))
        localStorage.setItem('paginaAnterior', String("inicioSesion"))
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión Exitoso',
          text: 'Has iniciado sesión correctamente',
          timer: 1000, // 1 segundo
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['/veterinario/dashboard']);
        });
      }
    });
  }
}  