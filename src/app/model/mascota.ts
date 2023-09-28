import { Tratamiento } from "./tratamiento";
import { Usuario } from "./usuario";

export interface Mascota {
    id: number;
    nombre: string;
    raza: string;
    edad: number;
    peso: number;
    foto: string;
    enfermedad: string;
    estado: string;
    duenio: Usuario;
    tratamientos: Tratamiento[];
  }
  