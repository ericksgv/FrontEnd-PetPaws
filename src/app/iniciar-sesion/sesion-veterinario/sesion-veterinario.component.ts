import { Component } from '@angular/core';

@Component({
  selector: 'app-sesion-veterinario',
  templateUrl: './sesion-veterinario.component.html',
  styleUrls: ['./sesion-veterinario.component.css', '../../../styles.css']
})
export class SesionVeterinarioComponent {
  cedula: string = ''; // Agrega la propiedad cedula y define su tipo
  error: boolean = false; // Agrega la propiedad error y define su tipo
  vacio: boolean = false; // Agrega la propiedad vacio y define su tipo
  login() {
    // Aquí puedes implementar la lógica de inicio de sesión
  }
}
