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
    DropdownMenuComponent
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
