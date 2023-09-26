import { Injectable } from '@angular/core';
import { Mascota } from 'src/app/model/mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private mascotas: Mascota[] = [];

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
        edad: Math.floor(Math.random() * 10) + 1,
        peso: Math.floor(Math.random() * 30) + 1,
        foto: 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg',
        enfermedad: 'Ninguna',
        estado: estados[Math.floor(Math.random() * estados.length)],
        duenio: {
          id: i,
          nombre: `Propietario${i}`,
          cedula: 0,
          correo: '',
          celular: 0,
          mascotas: [],
        },
        tratamientos: [],
      };

      this.mascotas.push(mascota);
    }
  }

  getMascotas(): Mascota[] {
    return this.mascotas;
  }

  eliminarMascota(id: number) {
    this.mascotas = this.mascotas.filter((mascota) => mascota.id !== id);
  }

  modificarMascota(id: number, nuevaMascota: Mascota) {
    const index = this.mascotas.findIndex((mascota) => mascota.id === id);
    if (index !== -1) {
      this.mascotas[index] = nuevaMascota;
    }
  }

  getMascotaPorId(id: number): Mascota | undefined {
    return this.mascotas.find((mascota) => mascota.id === id);
  }

  agregarMascota(mascota: Mascota): void {
    this.mascotas.push(mascota);
  }
  
}

