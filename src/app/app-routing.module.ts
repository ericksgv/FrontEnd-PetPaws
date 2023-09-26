import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { HeaderComponent } from './mascota/header/header.component';
import { AgregarMascotaComponent } from './mascota/agregar-mascota/agregar-mascota.component';
import { ModificarMascotaComponent } from './mascota/modificar-mascota/modificar-mascota.component';
import { DropdownMenuComponent} from "./dropdown-menu/dropdown-menu.component";
import { LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [

  {
    path: 'landingPage',
    component: LandingPageComponent
  },

  {
    path: 'dropdownMenu',
    component: DropdownMenuComponent
  },

  {
    path: 'mascotas/all',
    component: MascotaTableComponent,
  },
  {
    path: 'mascotas/add',
    component: AgregarMascotaComponent,
  },
  {
    path: 'mascotas/modificar/:id',
    component: ModificarMascotaComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
