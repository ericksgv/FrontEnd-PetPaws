import { Component } from '@angular/core';
import { MenuServiceService } from '../../dropdown-menu/menu-service.service'

@Component({
  selector: 'app-top-bar-landing-page',
  templateUrl: './top-bar-landing-page.component.html',
  styleUrls: ['./top-bar-landing-page.component.css']
})
export class TopBarLandingPageComponent {

  constructor(private menuService: MenuServiceService) {
  }

  public MenuServiceService = MenuServiceService;

  cambiarVisibilidadMenu(){
    this.menuService.cambiarVisibilidadMenu()
  }

}
