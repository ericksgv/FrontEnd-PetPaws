import { Component } from '@angular/core';
import { CitasService } from 'src/app/cita/Service/citas.service';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {
  selectedDate: string = ""; 
  horasDisponibles: Date[] = []; 
  horaSeleccionada: Date = new Date();


  constructor(private servicioSpring: CitasService) { }

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
  }

  guardarCita() {
    if (this.horaSeleccionada) {
      const cita = {
        fechaHora: this.horaSeleccionada,
      };

      this.servicioSpring.agregarCita(cita).subscribe(
        () => {
          console.log('Cita guardada exitosamente');
          this.cargarHorasDisponibles(); 
          this.horaSeleccionada = new Date();
        },
        error => {
          console.error('Error al guardar la cita', error);
        }
      );
    } else {
      console.warn('Selecciona una hora antes de guardar la cita');
    }
  }


}
