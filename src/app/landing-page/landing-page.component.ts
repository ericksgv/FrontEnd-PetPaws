import { Component } from '@angular/core';
import { VeterinarioService } from '../veterinario/Service/veterinario-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  userRole: string | undefined;

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}

  ngOnInit() {


      // Verificar si hay un token en localStorage
      const token = localStorage.getItem('token');

      if (token) {
        this.veterinarioService.getRol().subscribe((rol) => {
          this.userRole = rol;
          console.log(this.userRole);
          // Si es administrador mostrar los botones de agregar y eliminar
          if (this.userRole == 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          }
          // Si es veterinario mostrar los botones de agregar y eliminar
          else if (this.userRole == 'VETERINARIO') {
            this.router.navigate(['/veterinario/dashboard']);
          }

          // Si es usuario mostrar los botones de agregar y eliminar
          else if (this.userRole == 'CLIENTE') {
            this.router.navigate(['/usuario/dashboard']);
          }
        });
      }

  }
}
