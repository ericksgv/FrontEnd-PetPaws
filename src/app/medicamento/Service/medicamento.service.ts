import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from 'src/app/model/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService  {

private apiUrl = 'http://localhost:8090/medicamento';

constructor(private http: HttpClient) {}

getMedicamentos(): Observable<Medicamento[]> {
  return this.http.get<Medicamento[]>(`${this.apiUrl}/all`);
}

getMedicamentosMayorCero(): Observable<Medicamento[]> {
  return this.http.get<Medicamento[]>(`${this.apiUrl}/all-0`);
}

eliminarMedicamento(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
}

getMedicamentoPorId(id: number): Observable<Medicamento | undefined> {
  return this.http.get<Medicamento | undefined>(`${this.apiUrl}/find/${id}`);
}

buscarMedicamentosPorNombre(nombre: string): Observable<Medicamento[]> {
  return this.http.get<Medicamento[]>(`${this.apiUrl}/filtrar/${nombre}`);
}

}

