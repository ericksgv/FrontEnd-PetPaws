import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {Mascota} from "../../model/mascota";
import {UsuarioService} from "../Service/usuarioservice.service";
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';

@Component({
  selector: 'app-tabla-mascotas-usuario',
  templateUrl: './tabla-mascotas-usuario.component.html',
  styleUrls: ['./tabla-mascotas-usuario.component.css']
})
export class TablaMascotasUsuarioComponent implements  OnInit{

  usuarioActual: Usuario | undefined
  mascotasUsuario: Mascota[] | undefined
  rol: String | undefined

  constructor(private usuarioService: UsuarioService, private veterinarioService: VeterinarioService, private router: Router) {
  }

  ngOnInit(){

    // Se recupera el usuario de local storage con la llave "usuarioActual". Esta llave esta quemada con el fin
    // de no tener que enviar más información entre las pantallas.

    this.veterinarioService.getRol()
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle the 401 Unauthorized error here, e.g., navigate to a login page
          // or show an error message to the user.
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['unauthorized']);
        } 
        else if (error.status === 403) {
          // Handle the 401 Unauthorized error here, e.g., navigate to a login page
          // or show an error message to the user.
          console.log("Error status: " + error.status)
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['forbidden']);
        }
        return of(null); // Return an empty observable to avoid further error propagation.
      })
    )
    .subscribe((rol) => {
      this.rol = rol?? undefined;
      if(this.rol !== "CLIENTE"){
        console.log("ROL: " + this.rol)
        var cedulaString: string | null = localStorage.getItem('cedula');
        var cedula: number = 0
        if(cedulaString != null){
          cedula = parseInt(cedulaString)
        }
        this.usuarioService.getMascotasUsuarioCedula(cedula).subscribe(
          (mascotasUsuario => {
            this.mascotasUsuario = mascotasUsuario
          })
        )
      }else{
        this.usuarioService
        .usuarioHome()
        .subscribe((data) => {
          if (data) {
            this.usuarioActual = data;
            this.usuarioService.getMascotasUsuarioCedula(this.usuarioActual.cedula).subscribe(
              (mascotasUsuario => {
                this.mascotasUsuario = mascotasUsuario
              })
            )
          }
        });
      }
    });


  }



}
