import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from '../Service/service.service';
import { Veterinario } from '../../model/veterinario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-veterinario',
  templateUrl: './modificar-veterinario.component.html',
  styleUrls: ['./modificar-veterinario.component.css']
})
export class ModificarVeterinarioComponent implements OnInit {
  veterinarioForm: FormGroup;
  veterinario: Veterinario | undefined;
  cedula: number | undefined;

  constructor(
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.veterinarioForm = this.fb.group({
      id: [''],
      estado: [''],
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      numeroAtenciones: ['', Validators.required],
      foto: ['']
    });

    this.route.params.subscribe(params => {
      this.cedula = +params['id'];
    });
  }

  ngOnInit(): void {
    if (this.cedula) {
      this.veterinarioService.getVeterinarioPorId(this.cedula).subscribe((veterinario: Veterinario | undefined) => {
        this.veterinario = veterinario;
        if (veterinario) {
          this.veterinarioForm.setValue({
            id: veterinario.id,
            cedula: veterinario.cedula,
            nombre: veterinario.nombre,
            especialidad: veterinario.especialidad,
            numeroAtenciones: veterinario.numeroAtenciones,
            foto: veterinario.foto,
            estado: veterinario.estado,
          });
        } else {
          this.router.navigate(['/veterinario/all']);
        }
      });
    }
  }

  modificarVeterinario() {
    if (this.veterinarioForm.valid && this.veterinario) {
      const veterinarioModificado = this.veterinarioForm.value;
      console.log(veterinarioModificado.estado);
      this.veterinarioService.actualizarVeterinario(this.cedula, veterinarioModificado).subscribe(() => {
        this.router.navigate(['/veterinario/all']);
      });
    } else {
      console.error("La cedula es indefinida o el formulario no es válido.");
    }
  }
  
}
