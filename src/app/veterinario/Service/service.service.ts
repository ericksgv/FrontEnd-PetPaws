import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veterinario } from '../../model/veterinario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8090/veterinario'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/all`);
  }

  getVeterinarioPorId(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/find/${id}`);
  }

  agregarVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    console.log(veterinario);
    return this.http.post<Veterinario>(`${this.apiUrl}/add`, veterinario);
  }

  actualizarVeterinario(id:  number | undefined, veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.apiUrl}/update/${id}`, veterinario);
  }

  eliminarVeterinario(id: number): Observable<void> {
    console.log(id);
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
