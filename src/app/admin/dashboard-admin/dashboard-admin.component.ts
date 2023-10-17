import { Component, OnInit } from '@angular/core';
import {DashboardAdminService} from "../dashboard-admin.service";
import {Medicamento} from "../../model/medicamento";
import { Tratamiento } from "../../model/tratamiento";


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




  constructor(private dashboardService: DashboardAdminService) {
  }

  ngOnInit() {
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
        this.tratamientosUltimoMes = tratamientosEsteMes
      }
    )

    /* -------------- */

    this.dashboardService.getCantidadTratamientosPorMedicamento().subscribe(
      (mapaTramientos) => {
        this.cantidadTratamientosPorMedicamento = mapaTramientos
      }
    )


    /* -------------- */


  }

}
