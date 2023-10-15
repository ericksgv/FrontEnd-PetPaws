import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Importar FormGroup y FormBuilder
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service'; 

@Component({
  selector: 'app-agregar-tratamiento',
  templateUrl: './agregar-tratamiento.component.html',
  styleUrls: ['./agregar-tratamiento.component.css']
})
export class AgregarTratamientoComponent {
  constructor(private tratamientoService: ServiceService, private router: Router) {}
}
