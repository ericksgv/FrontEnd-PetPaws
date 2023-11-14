import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veterinario } from '../../model/veterinario';
import { Injectable } from '@angular/core';
import {Usuario} from "../../model/usuario";
import { LoginModel } from 'src/app/model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = 'http://localhost:8090/veterinario'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/all`);
  }

  getVeterinarioPorCedula(cedula: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/find/${cedula}`)
  }

  login(infoLogin: LoginModel): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, infoLogin, {
      responseType: 'text'
    });
  }

  getRol(): Observable<string> {
    return this.http.get(`http://localhost:8090/user/roles`, {
      responseType: 'text'
    });
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

  activarVeterinario(cedula: number): Observable<string> {
    console.log(cedula);
    return this.http.put(`${this.apiUrl}/activate/${cedula}`, null, { responseType: 'text' });
  }
  
  

  buscarVeterinarioFiltro(data: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/filtrar/${data}`);
  }

  veterinarioHome(): Observable<Veterinario>{
    return this.http.get<Veterinario>(`${this.apiUrl}/details`)
  }


  verificarPermisosAdd(): Observable<String>{
    return this.http.get<String>(`${this.apiUrl}/verificar-permisos/add`)
  }
}
