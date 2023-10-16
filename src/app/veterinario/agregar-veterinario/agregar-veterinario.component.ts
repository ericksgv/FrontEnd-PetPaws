import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeterinarioService } from '../Service/service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-veterinario',
  templateUrl: './agregar-veterinario.component.html',
  styleUrls: ['./agregar-veterinario.component.css']
})
export class AgregarVeterinarioComponent  {
  veterinarioForm: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private veterinarioService: VeterinarioService
    ) {
      this.veterinarioForm = this.formBuilder.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        passwordHash: ['', Validators.required],
        especialidad: ['', Validators.required],
        numeroAtenciones: ['', Validators.required],
        foto: [''] 
      });
    }


  agregarVeterinario() {

      const veterinario = this.veterinarioForm.value;
      this.veterinarioService.agregarVeterinario(veterinario).subscribe(() => {
        this.router.navigate(['veterinario/all']); 
      });
  }
}

