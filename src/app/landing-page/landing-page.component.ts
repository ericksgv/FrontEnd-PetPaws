import { Component } from '@angular/core';
import { MenuServiceService } from '../dropdown-menu/menu-service.service'
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  visibilidadMenu = this.menuService.getVisibilidadMenu()

  constructor(private menuService: MenuServiceService) {
  }

  ngOnInit() {
    this.menuService.menuVisibility$.subscribe((isVisible) => {
      this.visibilidadMenu = isVisible;
      
    });
  }

}
