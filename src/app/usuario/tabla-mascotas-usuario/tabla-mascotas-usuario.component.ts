import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {Mascota} from "../../model/mascota";
import {UsuarioService} from "../Service/usuarioservice.service";
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-tabla-mascotas-usuario',
  templateUrl: './tabla-mascotas-usuario.component.html',
  styleUrls: ['./tabla-mascotas-usuario.component.css']
})
export class TablaMascotasUsuarioComponent implements  OnInit{

  usuarioActual: Usuario | undefined
  mascotasUsuario: Mascota[] | undefined

  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  ngOnInit(){

    // Se recupera el usuario de local storage con la llave "usuarioActual". Esta llave esta quemada con el fin
    // de no tener que enviar más información entre las pantallas.
    this.usuarioActual = this.usuarioService.getUsuarioLocalStorage("usuarioActual")!

    this.usuarioService
    .usuarioHome()
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
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
        this.usuarioService.getMascotasUsuarioCedula(this.usuarioActual.cedula).subscribe(
          (mascotasUsuario => {
            this.mascotasUsuario = mascotasUsuario
            console.log("Mascotas obtenidas del usuario: " + mascotasUsuario)
          })
        )
      }
    });
  }



}
