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

  login(infoLogin: LoginModel): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.apiUrl}/login`, infoLogin)
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

  activarVeterinario(id: number): Observable<void> {
    console.log(id);
    return this.http.put<void>(`${this.apiUrl}/activate/${id}`, null);
  }

  buscarVeterinarioFiltro(data: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/filtrar/${data}`);
  }

  guardarVeterinarioEnLocalStorage(veterinario: Veterinario){

    const stringVeterinario =  JSON.stringify(veterinario)

    localStorage.setItem("veterinarioActual", stringVeterinario)
  }

  getVeterinarioLocalStorage(cedulaVeterinario: string) : Veterinario | null {

    const stringVeterinario = localStorage.getItem("veterinarioActual")
    // Se conviertern los datos del usuario de string a un objeto Usuario
    if (stringVeterinario != null){
      const datosVeterinario = JSON.parse(stringVeterinario)
      return datosVeterinario
    }
    console.log("Datos del veterinario son nulos. No se retorna nada.")
    return null

  }
}
