import { Component, OnInit } from '@angular/core';
import {DashboardAdminService} from "../dashboard-admin.service";
import {Medicamento} from "../../model/medicamento";
import { Tratamiento } from "../../model/tratamiento";
import { CurrencyPipe } from '@angular/common';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements  OnInit{
  clientesTotales: number = -1
  mascotasRegistradas : number = -1
  mascotasTratamiento : number = -1
  veterinariosActivos : number = -1
  veterinariosInactivos : number = -1
  ventasTotales : number = -1
  gananciasTotales : number = -1
  // @ts-ignore
  top3Medicamentos : Medicamento[]
  // @ts-ignore
  tratamientosUltimoMes : Tratamiento[]
  // @ts-ignore
  cantidadTratamientosPorMedicamento : Map<Medicamento, number>




  constructor(private dashboardService: DashboardAdminService,
    private router: Router) {
  }

  ngOnInit() {
    this.dashboardService
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
        if(data){
          this.dashboardService.getTotalClientes().subscribe(
            (totalClientes => {
              this.clientesTotales = totalClientes!
            })
          )
      
          /* -------------- */
      
          this.dashboardService.getTotalMascotas().subscribe(
            (totalMascotas) => {
              this.mascotasRegistradas = totalMascotas!
            }
          )
          /* -------------- */
      
          this.dashboardService.getTotalMascotasTratamiento().subscribe(
            (totalMascotasTratamiento) => {
              this.mascotasTratamiento = totalMascotasTratamiento!
            }
          )
      
      
          /* -------------- */
      
          this.dashboardService.getTotalVeterinariosActivos().subscribe(
            (totalVetsActivos) => {
              this.veterinariosActivos = totalVetsActivos!
            }
          )
      
          /* -------------- */
      
          this.dashboardService.getTotalVeterinariosInactivos().subscribe(
            (totalVetsInactivos) => {
              this.veterinariosInactivos = totalVetsInactivos!
            }
          )
      
          /* -------------- */
      
          this.dashboardService.getGananciasTotales().subscribe(
            (gananciasTotales) => {
              this.gananciasTotales = gananciasTotales!
            }
          )
      
          /* -------------- */
      
          this.dashboardService.getVentasTotales().subscribe(
            (ventasTotales) => {
              this.ventasTotales = ventasTotales!
            }
          )
      
          /* -------------- */
      
          this.dashboardService.getTop3Medicamentos().subscribe(
            (top3Medicamentos) => {
              this.top3Medicamentos = top3Medicamentos
            }
          )
      
          /* -------------- */
      
          this.dashboardService.getTratamientosEsteMes().subscribe(
      
            (tratamientosEsteMes) => {
              console.log(tratamientosEsteMes);
              this.tratamientosUltimoMes = tratamientosEsteMes
            }
          )
      
          /* -------------- */
      
          this.dashboardService.getCantidadTratamientosPorMedicamento().subscribe(
            (mapaTramientos) => {
              console.log(mapaTramientos);
              this.cantidadTratamientosPorMedicamento = mapaTramientos
            }
          )
      
      
          /* -------------- */
        }
    })



  }




}
