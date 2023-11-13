import {Component, OnInit} from '@angular/core';
import {MascotaService} from "../Service/mascotaservice.service";
import {ActivatedRoute} from "@angular/router";
import {Mascota} from "../../model/mascota";
import {TratamientoDTO} from "../../model/tratamientoDTO";

@Component({
  selector: 'app-informacion-mascota',
  templateUrl: './informacion-mascota.component.html',
  styleUrls: ['./informacion-mascota.component.css', '../../../styles.css']
})
export class InformacionMascotaComponent implements OnInit {

  mascotaActual: Mascota | undefined
  tratamientosMascota: TratamientoDTO[] | undefined

  constructor(private mascotaService: MascotaService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    let stringMascotaId: string | null;
    stringMascotaId = this.route.snapshot.paramMap.get("id")

    if (stringMascotaId != null){
      let numberMascotaId: number = Number(stringMascotaId)

      this.mascotaService.getMascotaPorId(numberMascotaId).subscribe(
        (mascota) => {
          this.mascotaActual = mascota

          this.mascotaService.getTratamientos(numberMascotaId).subscribe(
            (tratamientos) => {
              this.tratamientosMascota = tratamientos
            }
          )
        }
      )

    }

  }

}
