import {Component, OnInit} from '@angular/core';
import { UsuarioService } from "../Service/usuarioservice.service";
import {Usuario} from "../../model/usuario";

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit{

  private cedulaUsuario: number = this.usuarioService.getCedulaUsuarioActual()
  usuarioActual: Usuario | undefined

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(){
    this.usuarioService.getUsuarioPorCedula(this.cedulaUsuario).subscribe(
    (datosUsuario) => {
      this.usuarioActual = datosUsuario
      console.log("Datos de usuario recibidos: " + datosUsuario)
    }
    )
  }


}
