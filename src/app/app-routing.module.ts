import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { HeaderComponent } from './mascota/header/header.component';
import { AgregarMascotaComponent } from './mascota/agregar-mascota/agregar-mascota.component';
import { ModificarMascotaComponent } from './mascota/modificar-mascota/modificar-mascota.component';
import { DropdownMenuComponent} from "./dropdown-menu/dropdown-menu.component";
import { LandingPageComponent} from "./landing-page/landing-page.component";
import { ModificarUsuarioComponent } from './usuario/modificar-usuario/modificar-usuario.component';
import { AgregarUsuarioComponent } from './usuario/agregar-usuario/agregar-usuario.component';
import { UsuarioTableComponent } from './usuario/usuario-table/usuario-table.component';
import { SesionUsuarioComponent } from './iniciar-sesion/sesion-usuario/sesion-usuario.component';
import { SesionAdministradorComponent } from './iniciar-sesion/sesion-administrador/sesion-administrador.component';
import { SesionVeterinarioComponent } from './iniciar-sesion/sesion-veterinario/sesion-veterinario.component';
import {DashboardUsuarioComponent} from "./usuario/dashboard-usuario/dashboard-usuario.component";
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';
import { AgregarVeterinarioComponent } from './veterinario/agregar-veterinario/agregar-veterinario.component';
import { ModificarVeterinarioComponent } from './veterinario/modificar-veterinario/modificar-veterinario.component';
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { AgregarTratamientoComponent } from './tratamiento/agregar-tratamiento/agregar-tratamiento.component';
import { ModificarTratamientoComponent } from './tratamiento/modificar-tratamiento/modificar-tratamiento.component';
import {DashboardAdminComponent} from "./admin/dashboard-admin/dashboard-admin.component";
import { DashboardVeterinarioComponent } from './veterinario/dashboard-veterinario/dashboard-veterinario.component';
import {TablaMascotasUsuarioComponent} from "./usuario/tabla-mascotas-usuario/tabla-mascotas-usuario.component";
import {InformacionMascotaComponent} from "./mascota/informacion-mascota/informacion-mascota.component";
import { ChatgptComponent } from './chat/chatgpt/chatgpt.component';
import { UnauthorizedComponent } from './errores/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './errores/forbidden/forbidden.component';
import { CitaComponent } from './cita/cita/cita.component';
import { ListaCitasComponent } from './cita/lista-citas/lista-citas.component';

const routes: Routes = [

  {
    path: '',
    component: LandingPageComponent
  },

  {
    path: 'mascotas/all',
    component: MascotaTableComponent,
  },
  {
    path: 'veterinario/dashboard',
    component: DashboardVeterinarioComponent,
  },
  {
    path: 'mascotas/add',
    component: AgregarMascotaComponent,
  },
  {
    path: 'mascotas/modificar/:id',
    component: ModificarMascotaComponent,
  },

  {
    path: 'mascota/informacion',
    component: InformacionMascotaComponent
  },

  {
    path: 'usuario/update/:id',
    component: ModificarUsuarioComponent,
  },
  {
    path: 'usuario/add',
    component: AgregarUsuarioComponent,
  },
  {
    path: 'usuario/all',
    component: UsuarioTableComponent,
  },

  {
    path: 'usuario/dashboard',
    component: DashboardUsuarioComponent,
  },

  {
    path: 'usuario/mascotas',
    component: TablaMascotasUsuarioComponent
  },

  {
    path: 'usuario/login',
    component: SesionUsuarioComponent,
  },
  {
    path: 'administrador/login',
    component: SesionAdministradorComponent,
  },

  {
    path: 'admin/dashboard',
    component: DashboardAdminComponent
  },

  {
    path: 'veterinario/login',
    component: SesionVeterinarioComponent,
  },

  {
    path: 'veterinario/all',
    component: VeterinarioTableComponent,
  },
  {
    path: 'veterinario/add',
    component: AgregarVeterinarioComponent,
  },
  {
    path: 'veterinario/update/:id',
    component: ModificarVeterinarioComponent,
  },
/*  {
    path: 'veterinario/dashboard/:cedula',
    component: DashboardVeterinarioComponent,
  },*/
  {
    path: 'tratamiento/all',
    component: TratamientoTableComponent,
  },
  {
    path: 'tratamiento/add',
    component: AgregarTratamientoComponent,
  },
  {
    path: 'tratamiento/update/:id',
    component: ModificarTratamientoComponent,
  },
  {
    path: 'chat',
    component: ChatgptComponent,
  },
  {path: 'unauthorized',
    component: UnauthorizedComponent,
  },
    {path: 'forbidden',
  component: ForbiddenComponent,
  },
  {
    path: 'agregar/cita',
    component: CitaComponent,
  },
  {
    path: 'citas',
    component: ListaCitasComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
