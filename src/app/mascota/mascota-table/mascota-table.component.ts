import { Component } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';


@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent {
  mascotas: Mascota[] = [];

  constructor() {
    this.crearMascotasFalsas();
  }

  private crearMascotasFalsas() {
    const estados = ['Sin estado', 'Hospitalizado', 'Curado'];

    for (let i = 1; i <= 10; i++) {
      const mascota: Mascota = {
        id: i,
        nombre: `Perro${i}`,
        raza: `Raza${i}`,
        edad: Math.floor(Math.random() * 10) + 1, // Edad aleatoria entre 1 y 10 años
        peso: Math.floor(Math.random() * 30) + 1, // Peso aleatorio entre 1 y 30 kg
        foto: 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg', // URL de la imagen
        enfermedad: 'Ninguna',
        estado: estados[Math.floor(Math.random() * estados.length)], // Estado aleatorio
        duenio: {
          id: i,
          nombre: `Propietario${i}`,
          cedula: 0,
          correo: '',
          celular: 0,
          mascotas: []
        },
        tratamientos: [], // Puedes dejarlo vacío o agregar tratamientos falsos si lo deseas
      };

      this.mascotas.push(mascota);
    }
  }
}

