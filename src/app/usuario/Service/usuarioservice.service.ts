import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';  // Asegúrate de importar el modelo de usuario
import { Mascota } from 'src/app/model/mascota'

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8090/usuario';  // Ajusta la URL según tu backend
  private cedulaUsuarioActual: number = -1

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/all`);
  }

  eliminarUsuario(cedula: number): Observable<void> {
    console.log(cedula);
    return this.http.delete<void>(`${this.apiUrl}/delete/${cedula}`);
  }

  modificarUsuario(cedula: number | undefined, usuario: Usuario): Observable<void> {
    console.log(usuario);
    return this.http.put<void>(`${this.apiUrl}/update/${usuario.cedula}`, usuario);
  }

  activarUsuario(id: number | undefined): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/activate/${id}`, null  );
  }

  getUsuarioPorCedula(cedula: number): Observable<Usuario | undefined> {
    return this.http.get<Usuario | undefined>(`${this.apiUrl}/find/${cedula}`);
  }

  agregarUsuario(usuario: Usuario): Observable<void> {
    console.log(usuario);
    return this.http.post<void>(`${this.apiUrl}/agregar`, usuario);
  }

  getCedulaUsuarioActual() : number {
    return this.cedulaUsuarioActual
  }

  setCedulaUsuarioActual(nuevaCedula : number): void{
    this.cedulaUsuarioActual = nuevaCedula
  }

  getMascotasUsuarioCedula(cedula: number) : Observable<Mascota[] | undefined>{
    return this.http.get<Mascota[] | undefined>(`${this.apiUrl}/mascotas/${cedula}`)
  }

  buscarUsuariosPorCedula(cedula: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/filtrar/${cedula}`);
  }

  /* Metodos para guardar informacion del usuario en Local storage.
  *  - Local storage porque se quiere que la información pueda ser vista desde varias tabs.
  * */

  guardaUsuarioEnLocalStorage(usuario: Usuario){

    // Primero se convierten los datos del usuario a strings, porque local storage solo guarda strings.
    const stringCedulaUsuario = usuario.cedula.toString()
    const stringUsuario =  JSON.stringify(usuario)

    // Se guardan los datos del usuario en SessionStorage en un par llave-valor
    //  Cedula llave, Usuario - valor
    localStorage.setItem(stringCedulaUsuario, stringUsuario)
  }

  getUsuarioLocalStorage(cedulaUsuario: string) : Usuario | null {

    const stringUsuario = localStorage.getItem(cedulaUsuario)
    // Se conviertern los datos del usuario de string a un objeto Usuario
    if (stringUsuario != null){
      const datosUsuario = JSON.parse(stringUsuario)
      return datosUsuario
    }

    console.log("Datos del usuario son nulos. No se retorna nada.")
    return null

  }


}

