import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {Mascota} from "../../model/mascota";
import {UsuarioService} from "../Service/usuarioservice.service";

@Component({
  selector: 'app-tabla-mascotas-usuario',
  templateUrl: './tabla-mascotas-usuario.component.html',
  styleUrls: ['./tabla-mascotas-usuario.component.css']
})
export class TablaMascotasUsuarioComponent implements  OnInit{

  usuarioActual: Usuario | undefined
  mascotasUsuario: Mascota[] | undefined

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(){

    // Se recupera el usuario de local storage con la llave "usuarioActual". Esta llave esta quemada con el fin
    // de no tener que enviar más información entre las pantallas.
    this.usuarioActual = this.usuarioService.getUsuarioLocalStorage("usuarioActual")!

    this.usuarioService.getMascotasUsuarioCedula(this.usuarioActual.cedula).subscribe(
      (mascotasUsuario => {
        this.mascotasUsuario = mascotasUsuario
        console.log("Mascotas obtenidas del usuario: " + mascotasUsuario)
      })
    )
  }



}
