import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../Service/mascotaservice.service';
import { Mascota } from 'src/app/model/mascota';
import Swal from 'sweetalert2';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.css']
})
export class ModificarMascotaComponent implements OnInit {
  mascota: Mascota | undefined;
  rol: String = '';
  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.veterinarioService.getRol().subscribe(rol => {
      this.rol = rol;
    });
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
      console.log(this.mascota);
      this.mascotaService.modificarMascota(id, this.mascota).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Mascota actualizada exitosamente',
          timer: 2000, 
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['/mascotas/all']);
        });
      });
    } else {
      this.router.navigate(['/mascotas/modificar']);
    }
  }
}



