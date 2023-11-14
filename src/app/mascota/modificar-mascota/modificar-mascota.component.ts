import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../Service/mascotaservice.service';
import { Mascota } from 'src/app/model/mascota';
import Swal from 'sweetalert2';
import { VeterinarioService } from 'src/app/veterinario/Service/veterinario-service.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
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
    if(id){
      this.mascotaService.getMascotaPorId(id)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            console.log('Unauthorized error. Redirecting to login page.');
            this.router.navigate(['unauthorized']);
          } else if (error.status === 403) {
            console.log('Forbidden error. Redirecting to forbidden page.');
            this.router.navigate(['forbidden']);
          } else {
            console.error('An error occurred:', error);
            // Puedes agregar más lógica aquí para manejar otros tipos de errores si es necesario.
          }
          return of(null); // Return an empty observable to avoid further error propagation.
        })
      )
      .subscribe((mascota) => {
        this.mascota = mascota ?? undefined;
  
        if (!this.mascota) {
          this.router.navigate(['/mascotas/all']);
        }
      });
    } else {
      this.router.navigate(['/mascotas/all']);
    }
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



