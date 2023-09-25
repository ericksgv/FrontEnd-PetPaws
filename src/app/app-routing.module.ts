import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { HeaderComponent } from './mascota/header/header.component';
import { AgregarMascotaComponent } from './mascota/agregar-mascota/agregar-mascota.component';

const routes: Routes = [
  {
    path: 'mascotas/all',
    component: MascotaTableComponent,
  },
  {
    path: 'mascotas/add',
    component: AgregarMascotaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
