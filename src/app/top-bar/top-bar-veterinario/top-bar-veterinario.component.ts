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

  datosVeterinario: Veterinario | null = null

  constructor(private vetService: VeterinarioService, private router: Router) {
  }


  devolverseDashboard():void{
    this.datosVeterinario = this.vetService.getVeterinarioLocalStorage()

    if(this.datosVeterinario != null){
      this.router.navigate(["/veterinario/dashboard/", this.datosVeterinario.cedula])
    }
  }
}
