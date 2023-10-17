import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Medicamento} from "../model/medicamento";
import {Tratamiento} from "../model/tratamiento";
import { Usuario } from 'src/app/model/usuario';  // Asegúrate de importar el modelo de usuario
import { Mascota } from 'src/app/model/mascota'
import {LocalNgModuleData} from "@angular/compiler-cli/src/ngtsc/scope";

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {

  private apiUrl = 'http://localhost:8090/dashboard';  // Ajusta la URL según tu backend
  private cedulaUsuarioActual: number = -1

  constructor(private http: HttpClient) { }

  getMedicamentosTop3(){

  }

  getTotalClientes() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/usuarios/total`)
  }

  getTotalMascotas() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/mascotas/total`)
  }

  getTotalMascotasTratamiento() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/mascotas/tratamiento`)
  }

  getTotalVeterinariosActivos() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/veterinarios/activos`)
  }

  getTotalVeterinariosInactivos() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/veterinarios/inactivos`)
  }

  getVentasTotales() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/medicamentos/ventas-totales`)
  }

  getGananciasTotales() : Observable<number | undefined > {
    return this.http.get<number | undefined>(`${this.apiUrl}/medicamentos/ganancias-totales`)
  }

  getTop3Medicamentos() : Observable<Medicamento[] > {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/medicamentos/top3-mas-vendidos`)
  }

  getTratamientosEsteMes() : Observable<Tratamiento[] > {
  return this.http.get<Tratamiento[]>(`${this.apiUrl}/tratamientos/ultimo-mes`)
  }

  getCantidadTratamientosPorMedicamento() : Observable<Map<Medicamento, number>> {
  return this.http.get<Map<Medicamento, number>>(`${this.apiUrl}/medicamentos/tratamientos/ultimo-mes`)

}








}
