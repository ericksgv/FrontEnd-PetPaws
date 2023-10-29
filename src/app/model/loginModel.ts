export class LoginModel {
    cedula: number;
    contrasena: string;
  
    constructor(cedula: number, contrasena: string) {
      this.cedula = cedula;
      this.contrasena = contrasena;
    }
  }
  