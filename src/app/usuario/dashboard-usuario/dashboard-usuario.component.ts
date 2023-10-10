import {Component, OnInit} from '@angular/core';
import { UsuarioService } from "../Service/usuarioservice.service";
import {Usuario} from "../../model/usuario";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit{

  usuarioActual: Usuario | undefined
  private cedulaUsuario: number = this.usuarioService.getCedulaUsuarioActual()


  constructor(private usuarioService: UsuarioService) {
  }

  // Controles para el form
  cedula = new FormControl()
  nombre = new FormControl('')
  correo = new FormControl('')
  celular = new FormControl ()


  ngOnInit(){
    this.usuarioService.getUsuarioPorCedula(this.cedulaUsuario).subscribe(
    (datosUsuario) => {
      this.usuarioActual = datosUsuario
      console.log("Datos de usuario recibidos: " + datosUsuario)
      this.cedula.setValue(datosUsuario?.cedula)
      this.nombre.setValue(datosUsuario?.nombre!)
      this.correo.setValue(datosUsuario?.correo!)
      this.celular.setValue(datosUsuario?.celular)


    }
    )
  }


}
