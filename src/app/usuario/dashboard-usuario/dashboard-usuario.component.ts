import {Component, OnInit} from '@angular/core';
import { UsuarioService } from "../Service/usuarioservice.service";
import {Usuario} from "../../model/usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {Mascota} from "../../model/mascota";

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit{

  usuarioActual: Usuario | undefined
  mascotasUsuario: Mascota[] | undefined

  constructor(private usuarioService: UsuarioService) {
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
    this.usuarioActual = this.usuarioService.getUsuarioLocalStorage("usuarioActual")!

      // Se llenan los campos del form si la informacion del usuario no es nula
        this.setInformacionForm(this.usuarioActual.cedula, this.usuarioActual.nombre, this.usuarioActual.correo, this.usuarioActual.celular)

      // Si es nula, se llena con no recibidos para saber que hubo un error con los datos.
      // if (datosUsuario == null){
      //   this.setInformacionForm(-1, "No recibido", "No recibido", -1)
      // }

    this.usuarioService.getMascotasUsuarioCedula(this.usuarioActual.cedula).subscribe(
      (mascotasUsuario => {
        this.mascotasUsuario = mascotasUsuario
        console.log("Mascotas obtenidas del usuario: " + mascotasUsuario)
      })
    )
  }

  setInformacionForm(cedula:number, nombre:string, correo:string, celular:number){
    this.formDatosUsuario.controls['cedula'].setValue(cedula)
    this.formDatosUsuario.controls['nombre'].setValue(nombre)
    this.formDatosUsuario.controls['correo'].setValue(correo)
    this.formDatosUsuario.controls['celular'].setValue(celular)
  }


}
