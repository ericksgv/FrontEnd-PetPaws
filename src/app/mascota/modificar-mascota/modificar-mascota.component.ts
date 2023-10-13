import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../Service/mascotaservice.service';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.css']
})
export class ModificarMascotaComponent implements OnInit {
  mascota: Mascota | undefined;

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id de la url: ", id)
    this.mascotaService.getMascotaPorId(id).subscribe((mascota) => {
      this.mascota = mascota;

      if (!this.mascota) {
        this.router.navigate(['/mascotas/all']);
      }
    });
  }

  actualizarMascota() {
    if (this.mascota) {
      const id = this.mascota.id;
      this.mascotaService.modificarMascota(id, this.mascota).subscribe(() => {
        this.router.navigate(['/mascotas/all']);
      });
    } else {
      this.router.navigate(['/mascotas/modificar']);
    }
  }
}



