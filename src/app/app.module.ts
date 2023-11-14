import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { HeaderComponent } from './mascota/header/header.component';
import { ModificarMascotaComponent } from './mascota/modificar-mascota/modificar-mascota.component';
import { AgregarMascotaComponent } from './mascota/agregar-mascota/agregar-mascota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HeroSectionComponent } from './landing-page/hero-section/hero-section.component';
import { TestimoniosComponent } from './landing-page/testimonios/testimonios.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { ContactoComponent } from './landing-page/contacto/contacto.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { NgOptimizedImage } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ModificarUsuarioComponent } from './usuario/modificar-usuario/modificar-usuario.component';
import { AgregarUsuarioComponent } from './usuario/agregar-usuario/agregar-usuario.component';
import { UsuarioTableComponent } from './usuario/usuario-table/usuario-table.component';
import { SesionUsuarioComponent } from './iniciar-sesion/sesion-usuario/sesion-usuario.component';
import { SesionAdministradorComponent } from './iniciar-sesion/sesion-administrador/sesion-administrador.component';
import { SesionVeterinarioComponent } from './iniciar-sesion/sesion-veterinario/sesion-veterinario.component';
import { TopBarLandingPageComponent } from './top-bar/top-bar-landing-page/top-bar-landing-page.component';
import { DashboardUsuarioComponent } from './usuario/dashboard-usuario/dashboard-usuario.component';
import { TopBarClienteComponent } from './top-bar/top-bar-cliente/top-bar-cliente.component';
import { TopBarVeterinarioComponent } from './top-bar/top-bar-veterinario/top-bar-veterinario.component';
import { AgregarVeterinarioComponent } from './veterinario/agregar-veterinario/agregar-veterinario.component';
import { ModificarVeterinarioComponent } from './veterinario/modificar-veterinario/modificar-veterinario.component';
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';
import { AgregarTratamientoComponent } from './tratamiento/agregar-tratamiento/agregar-tratamiento.component';
import { ModificarTratamientoComponent } from './tratamiento/modificar-tratamiento/modificar-tratamiento.component';
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { DashboardVeterinarioComponent } from './veterinario/dashboard-veterinario/dashboard-veterinario.component';
import { TopBarAdminComponent } from './top-bar/top-bar-admin/top-bar-admin.component';
import { TopBarOscuroComponent } from './top-bar/top-bar-oscuro/top-bar-oscuro.component';
import { TablaMascotasUsuarioComponent } from './usuario/tabla-mascotas-usuario/tabla-mascotas-usuario.component';
import { InformacionMascotaComponent } from './mascota/informacion-mascota/informacion-mascota.component';
import { ChatgptComponent } from './chat/chatgpt/chatgpt.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { UnauthorizedComponent } from './errores/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './errores/forbidden/forbidden.component';
import { CitaComponent } from './cita/cita/cita.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ServiciosComponent} from "./landing-page/servicios/servicios.component";

@NgModule({
  declarations: [
    AppComponent,
    MascotaTableComponent,
    HeaderComponent,
    ModificarMascotaComponent,
    AgregarMascotaComponent,
    LandingPageComponent,
    TopBarComponent,
    HeroSectionComponent,
    TestimoniosComponent,
    AboutUsComponent,
    ContactoComponent,
    FooterComponent,
    ModificarUsuarioComponent,
    DropdownMenuComponent,
    AgregarUsuarioComponent,
    UsuarioTableComponent,
    SesionUsuarioComponent,
    SesionAdministradorComponent,
    SesionVeterinarioComponent,
    TopBarLandingPageComponent,
    DashboardUsuarioComponent,
    TopBarClienteComponent,
    TopBarVeterinarioComponent,
    AgregarVeterinarioComponent,
    ModificarVeterinarioComponent,
    VeterinarioTableComponent,
    AgregarTratamientoComponent,
    ModificarTratamientoComponent,
    TratamientoTableComponent,
    DashboardAdminComponent,
    DashboardVeterinarioComponent,
    TopBarAdminComponent,
    TopBarOscuroComponent,
    TablaMascotasUsuarioComponent,
    InformacionMascotaComponent,
    ChatgptComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    CitaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    ServiciosComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
