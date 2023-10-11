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
import { MisionComponent } from './landing-page/mision/mision.component';
import { TestimoniosComponent } from './landing-page/testimonios/testimonios.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { ContactoComponent } from './landing-page/contacto/contacto.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
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
    MisionComponent,
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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
