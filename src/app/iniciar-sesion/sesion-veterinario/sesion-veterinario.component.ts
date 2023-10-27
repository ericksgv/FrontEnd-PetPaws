import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {VeterinarioService} from "../../veterinario/Service/veterinario-service.service";
import {catchError} from "rxjs";

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

  camposForm: FormGroup = new FormGroup({
      campoCedula: new FormControl('', [Validators.required]),
      campoContrasena: new FormControl ('', Validators.required)
    }
  )

  constructor(private router: Router, private http: HttpClient, private vetService: VeterinarioService) { }

  login() {

    this.cedulaString = this.camposForm.get('campoCedula')?.value
    this.vetService.getVeterinarioPorCedula(Number(this.cedulaString)).pipe(
      catchError(error => {
          this.encontrado = false
          console.error('Vet no encontrado. Error:', error);

          return []; //
        }
      )
    ).subscribe(
      (datosVeterinario) => {

        if (datosVeterinario == null){
          this.encontrado = false;
        }

        if (datosVeterinario != null && datosVeterinario.estado == "inactivo"){
          this.vetInactivo = true;
        }

        if(datosVeterinario != null && datosVeterinario.estado == "activo"){
          this.vetService.guardarVeterinarioEnLocalStorage(datosVeterinario)
          this.router.navigate(['/veterinario/dashboard',this.cedulaString])
        }
      }
    )

  }
}
