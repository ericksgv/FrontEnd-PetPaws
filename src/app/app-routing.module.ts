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
const routes: Routes = [

  {
    path: '',
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
    path: 'usuario/login',
    component: SesionUsuarioComponent,
  },
  {
    path: 'administrador/login',
    component: SesionAdministradorComponent,
  },
  {
    path: 'veterinario/login',
    component: SesionVeterinarioComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
