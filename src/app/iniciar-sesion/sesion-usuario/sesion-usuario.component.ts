import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../usuario/Service/usuarioservice.service";
import {FormControl, Validators} from "@angular/forms";
import {catchError} from "rxjs";

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.component.html',
  styleUrls: ['./sesion-usuario.component.css', '../../../styles.css']
})
export class SesionUsuarioComponent {
  cedula: string = '';
  numeroCedula : number = -1
  usuarioEncontrado: boolean = true;
  usuarioInactivo: boolean = false;

  // Se valida la cedula haciendo uso de los validadores dados por Angular.
  // El input se especifica como numerico en HTML, por lo que aquí solo se valida que no este vacio.
  campoCedula = new FormControl('', [
    Validators.required
  ])


  constructor(private router: Router, private usuarioService: UsuarioService) {}


  login() {

    // Dado que siempre se va a retornar una valor, buscamos la cedula en los usuarios existentes.
    const cedulaUsuarioString = this.campoCedula.value!


       this.usuarioService.getUsuarioPorCedula(Number(cedulaUsuarioString)).pipe(
         catchError(error => {

             this.usuarioEncontrado = false
             console.error('Usuario no encontrado. Error:', error);

           return []; //
         }
        )
       ).subscribe(
         (datosUsuario) => {

           // Si el usuario es encontrado, pero inactivo, se habilita la flag para mostrar un mensaje.
           if (datosUsuario != null && datosUsuario.estado === "inactivo"){
             this.usuarioInactivo = true
             console.log("here")
           }

           // Si se encuentra el usuario y esta activo, se hace el login,
           // y se guardan sus datos en local storage.
           if (datosUsuario != null && datosUsuario.estado !== "inactivo"){
             this.usuarioEncontrado = true
             this.usuarioInactivo = false
             this.usuarioService.guardaUsuarioEnLocalStorage(datosUsuario)
             this.router.navigate(['/usuario/dashboard'])
           }

         }
       )


  }

  loginVeterinario() {
    this.router.navigate(['/veterinario/login']);
  }

  loginAdmin() {
    this.router.navigate(['/administrador/login']);
  }
}
