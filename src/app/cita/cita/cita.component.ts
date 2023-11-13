import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CitasService } from 'src/app/cita/Service/citas.service';
import { Cita } from 'src/app/model/cita';
import { Mascota } from 'src/app/model/mascota';
import { UsuarioService } from 'src/app/usuario/Service/usuarioservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {
  selectedDate: string = ""; 
  horasDisponibles: Date[] = []; 
  horaSeleccionada: Date = new Date();
  mascotas: Mascota[] = [];
  selectedMascota: number | undefined;
  showWarning: boolean = false;
  seleccionHora: boolean = false;

  constructor(private servicioSpring: CitasService, private usuarioService: UsuarioService, private router:Router) { }

  ngOnInit() {
    // Inicializar selectedDate con la fecha actual
    this.selectedDate = this.formatDate(new Date());


    // Se recupera el usuario de local storage con la llave "usuarioActual". Esta llave esta quemada con el fin
    // de no tener que enviar más información entre las pantallas.
    this.usuarioService
    .usuarioHome()
    .pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle the 401 Unauthorized error here, e.g., navigate to a login page
          // or show an error message to the user.
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['unauthorized']);
        }else if (error.status === 403) {
          // Handle the 401 Unauthorized error here, e.g., navigate to a login page
          // or show an error message to the user.
          console.log('Unauthorized error. Redirecting to login page.');
          this.router.navigate(['unauthorized']);
        }
        return of(null); // Return an empty observable to avoid further error propagation.
      })
    )
    .subscribe((data) => {
      if (data) {

    this.usuarioService.getMascotasUsuarioCedula(data.cedula).subscribe(
      (mascotasUsuario => {
        if (mascotasUsuario) {
          this.mascotas = mascotasUsuario;
        } else {
          this.mascotas = [];
        }
      }))}
      });
  

    // Cargar horas disponibles al inicio
    this.cargarHorasDisponibles();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cargarHorasDisponibles() {
    // Convierte la cadena de fecha a un objeto Date
    const fechaSeleccionada = new Date(this.selectedDate);
    
    // Llama al servicio con la fecha convertida
    this.servicioSpring.getHorasDisponiblesParaDia(fechaSeleccionada).subscribe(
      (horasDisponibles: Date[]) => {
        this.horasDisponibles = horasDisponibles;
      },
      error => {
        console.error('Error al cargar las horas disponibles', error);
      }
    );
  }

  seleccionarHora(hora: Date) {
    this.horaSeleccionada = hora;
    this.seleccionHora = true;
  }

  getMinDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  getMaxDate(): string {
    const maxDate = new Date();
    // Set the maximum date to two weeks in the future
    maxDate.setDate(maxDate.getDate() + 14);
    return this.formatDate(maxDate);
  }
  guardarCita() {
    if (this.seleccionHora && this.horaSeleccionada && this.selectedMascota) {
      const cita: Cita = {
        fechaHora: this.horaSeleccionada,
        idMascota: Number(this.selectedMascota)
      };
      this.servicioSpring.agregarCita(cita).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Cita agendada con éxito',
            timer: 2000, 
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
          }).then(() => {
            this.router.navigate(['/usuario/dashboard']);
          });
        }
      );
      this.showWarning = false;
      this.seleccionHora = false;
    } else {
      console.warn('Selecciona una hora antes de guardar la cita');
      this.showWarning = true;
    }
  }
}
