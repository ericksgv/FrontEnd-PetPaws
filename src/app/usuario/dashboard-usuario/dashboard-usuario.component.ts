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
  private cedulaUsuario: number = this.usuarioService.getCedulaUsuarioActual()
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

      this.usuarioActual = datosUsuario

      // Se llenan los campos del form si la informacion del usuario no es nula
      if (datosUsuario != null){
        this.setInformacionForm(datosUsuario.cedula, datosUsuario.nombre, datosUsuario.correo, datosUsuario.celular)
      }

      // Si es nula, se llena con no recibidos para saber que hubo un error con los datos.
      if (datosUsuario == null){
        this.setInformacionForm(-1, "No recibido", "No recibido", -1)
      }




    this.usuarioService.getMascotasUsuarioCedula(this.cedulaUsuario).subscribe(
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
