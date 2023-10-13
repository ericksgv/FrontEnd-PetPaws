import { Tratamiento } from "./tratamiento";

export interface Veterinario {
    id: number;
    cedula: number;
    nombre: string;
    password_Hash: string;
    especialidad: string;
    numeroAtenciones: number;
    foto: string;
    tratamientos: Tratamiento[];
  }
  