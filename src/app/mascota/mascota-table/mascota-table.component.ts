import { Component } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from '../Service/mascotaservice.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent {
  mascotas: Mascota[] = [];

  constructor(private mascotaService: MascotaService, private router: Router) {
    this.mascotas = this.mascotaService.getMascotas();
  }

  eliminarMascota(id: number) {
    this.router.navigate(['/mascotas/all']);
    // Llama al servicio para eliminar la mascota por su ID
    this.mascotaService.eliminarMascota(id);
    // Actualiza la lista de mascotas después de eliminar
    this.mascotas = this.mascotaService.getMascotas();
  }
  

  // Función para redirigir a la página de modificación
  modificarMascota(id: number) {
    // Busca la mascota por ID en la lista
    const mascota = this.mascotas.find(m => m.id === id);
    if (mascota) {
      // Si la mascota se encuentra, redirige a la página de modificación
      this.router.navigate(['/mascotas/modificar', id]);
    } else {
      // Si la mascota no se encuentra, redirige a la lista de mascotas
      this.router.navigate(['/mascotas/all']);
    }
  }
}


