import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';  // Asegúrate de importar el modelo de usuario

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8090/usuario';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/all`);
  }

  eliminarUsuario(cedula: number): Observable<void> {
    console.log(cedula);
    return this.http.delete<void>(`${this.apiUrl}/delete/${cedula}`);
  }

  modificarUsuario(cedula: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update${cedula}`, usuario);
  }

  getUsuarioPorCedula(cedula: number): Observable<Usuario | undefined> {
    return this.http.get<Usuario | undefined>(`${this.apiUrl}/find/${cedula}`);
  }

  agregarUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/agregar`, usuario);
  }





}

