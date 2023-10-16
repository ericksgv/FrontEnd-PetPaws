import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/model/mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private apiUrl = 'http://localhost:8090/mascota';

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/all`);
  }

  eliminarMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  modificarMascota(id: number, nuevaMascota: Mascota): Observable<void> {
    console.log(nuevaMascota);
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, nuevaMascota);
  }

  activarMascota(id: number): Observable<void> {
    console.log(id);
    return this.http.put<void>(`${this.apiUrl}/activate/${id}`, null);
  }

  getMascotaPorId(id: number): Observable<Mascota | undefined> {
    return this.http.get<Mascota | undefined>(`${this.apiUrl}/find/${id}`);
  }

  agregarMascota(mascota: Mascota): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/agregar`, mascota);
  }

  buscarMascotasPorNombre(nombre: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/filtrar/${nombre}`);
  }
}

