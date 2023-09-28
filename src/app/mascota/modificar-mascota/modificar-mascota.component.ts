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
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la mascota de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Usar el servicio para buscar la mascota por ID
    this.mascota = this.mascotaService.getMascotaPorId(id);

    // Si la mascota no se encuentra, redirigir a la página de mascotas/all
    if (!this.mascota) {
      this.router.navigate(['/mascotas/all']);
    }
  }

  actualizarMascota() {
    if (this.mascota) { // Verifica si this.mascota no es undefined
      const id = this.mascota.id;
      this.mascotaService.modificarMascota(id, this.mascota);
      this.router.navigate(['/mascotas/all']);
    } else {
      this.router.navigate(['/mascotas/modificar']);
    }
  }
  
}



