import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-sesion-veterinario',
  templateUrl: './sesion-veterinario.component.html',
  styleUrls: ['./sesion-veterinario.component.css', '../../../styles.css']
})
export class SesionVeterinarioComponent {
  cedula: string = ''; // Agrega la propiedad cedula y define su tipo
  error: boolean = false; // Agrega la propiedad error y define su tipo
  vacio: boolean = false; // Agrega la propiedad vacio y define su tipo
  constructor(private router: Router) { }
  login() {
        this.router.navigate(['/veterinario/dashboard', this.cedula]);
    }
}
