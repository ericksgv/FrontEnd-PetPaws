import { Component } from '@angular/core';
import {VeterinarioService} from "../../veterinario/Service/veterinario-service.service";
import {Veterinario} from "../../model/veterinario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar-veterinario',
  templateUrl: './top-bar-veterinario.component.html',
  styleUrls: ['./top-bar-veterinario.component.css', '../../../styles.css', '../top-bar.component.css']
})
export class TopBarVeterinarioComponent {
  cerrarCesion() {
  localStorage.removeItem('token'); // Elimina el token de localStorage
  this.router.navigate(['/']);
  }

  datosVeterinario: Veterinario | null = null

  constructor(private vetService: VeterinarioService, private router: Router) {
  }


  devolverseDashboard():void{
      this.router.navigate(["/veterinario/dashboard/"])
  }
}
