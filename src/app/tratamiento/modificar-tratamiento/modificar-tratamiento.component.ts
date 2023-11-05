import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Tratamiento } from 'src/app/model/tratamiento';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modificar-tratamiento',
  templateUrl: './modificar-tratamiento.component.html',
  styleUrls: ['./modificar-tratamiento.component.css']
})
export class ModificarTratamientoComponent implements OnInit {
  tratamiento: Tratamiento | undefined;

  constructor(
    private tratamientoService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ID de la URL: ", id)
    this.tratamientoService.getTratamientoPorId(id).subscribe((tratamiento) => {
      this.tratamiento = tratamiento;

      if (!this.tratamiento) {
        this.router.navigate(['/tratamientos/all']);
      }
    });
  }

  actualizarTratamiento() {
    if (this.tratamiento) {
      const id = this.tratamiento.id;
      this.tratamientoService.actualizarTratamiento(id, this.tratamiento).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'CRUD Exitoso',
          text: 'Tratamiento actualizado exitosamente',
          timer: 2000, 
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          this.router.navigate(['/tratamientos/all']);
        });
      });
    } else {
      this.router.navigate(['/tratamientos/modificar']);
    }
  }
}
