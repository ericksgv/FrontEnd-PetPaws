import {Component, OnInit} from '@angular/core';
import { UsuarioService } from "../Service/usuarioservice.service";
import {Usuario} from "../../model/usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {Mascota} from "../../model/mascota";
import { catchError } from 'rxjs/internal/operators/catchError';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit{

  usuarioActual!: Usuario | undefined
  mascotasUsuario: Mascota[] | undefined

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
  }


  // Controles para el form que muestra los datos
  formDatosUsuario = new FormGroup({
    cedula : new FormControl(),
    nombre : new FormControl(''),
    correo : new FormControl(''),
    celular : new FormControl ()
  })

  ngOnInit(){

    // Se recupera el usuario de local storage con la llave "usuarioActual". Esta llave esta quemada con el fin
    // de no tener que enviar más información entre las pantallas.
    this.usuarioService
    .usuarioHome()
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle the 401 Unauthorized error here, e.g., navigate to a login page
          // or show an error message to the user.
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['unauthorized']);
        }else if (error.status === 403) {
          // Handle the 401 Unauthorized error here, e.g., navigate to a login page
          // or show an error message to the user.
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['unauthorized']);
        }
        return of(null); // Return an empty observable to avoid further error propagation.
      })
    )
    .subscribe((data) => {
      if (data) {
        console.log(data);
        this.usuarioActual = data;
        this.setInformacionForm(this.usuarioActual.cedula, this.usuarioActual.nombre, this.usuarioActual.correo, this.usuarioActual.celular)

    this.usuarioService.getMascotasUsuarioCedula(this.usuarioActual.cedula).subscribe(
      (mascotasUsuario => {
        this.mascotasUsuario = mascotasUsuario
        console.log("Mascotas obtenidas del usuario: " + mascotasUsuario)
      })
    )
        console.log(this.usuarioActual);
      }
    });

    // Se llenan los campos del form con la informacion del usuario.
    
  }

  setInformacionForm(cedula:number, nombre:string, correo:string, celular:number){
    this.formDatosUsuario.controls['cedula'].setValue(cedula)
    this.formDatosUsuario.controls['nombre'].setValue(nombre)
    this.formDatosUsuario.controls['correo'].setValue(correo)
    this.formDatosUsuario.controls['celular'].setValue(celular)
  }

  onClickMascota(objeto: any){
    objeto.getAttribute()
  }


}
