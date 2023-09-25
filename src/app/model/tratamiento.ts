import { Mascota } from "./mascota";
import { Medicamento } from "./medicamento";
import { Veterinario } from "./veterinario";

export interface Tratamiento {
    id: number;
    descripcion: string;
    fecha: Date;
    mascota: Mascota;
    veterinario: Veterinario;
    medicamento: Medicamento;
  }
  