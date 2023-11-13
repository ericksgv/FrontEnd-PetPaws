import { Component } from '@angular/core';


@Component({
  selector: 'app-top-bar-landing-page',
  templateUrl: './top-bar-landing-page.component.html',
  styleUrls: ['./top-bar-landing-page.component.css', '../top-bar.component.css', '../../../styles.css']
})
export class TopBarLandingPageComponent {

  visibilidadMenu: boolean = false;


  cambiarVisibilidadMenu(){
    this.visibilidadMenu = !this.visibilidadMenu
    console.log("in function")
    console.log(this.visibilidadMenu)
  }

}
