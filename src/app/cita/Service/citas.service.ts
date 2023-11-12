import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CitasDTO } from 'src/app/model/citasDTO';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://localhost:8090/citas'; 

  constructor(private http: HttpClient) {}

  getAllCitas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getHorasDisponiblesParaDia(fecha: Date): Observable<any> {
    return this.http.get(`${this.apiUrl}/disponibles/${fecha.toISOString().split('T')[0]}`);
  }

  agregarCita(cita: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, cita);
  }

  getCitasMascotasUsuario(id: number): Observable<CitasDTO[]>{
    return this.http.get<CitasDTO[]>(`${this.apiUrl}/usuario/${id}`) ;
  }
}
