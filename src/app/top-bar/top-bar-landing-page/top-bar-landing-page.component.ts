import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-top-bar-landing-page',
  templateUrl: './top-bar-landing-page.component.html',
  styleUrls: ['./top-bar-landing-page.component.css', '../top-bar.component.css', '../../../styles.css'],
  animations: [
      trigger('popOverState', [
          state('show', style({
            opacity: 1
          })),
          state('hide', style ({
            opacity: 0
          })),
          transition('show => hide', animate('600ms ease-out')),
          transition('hide => show', animate('1000ms ease-in')),
      ])
  ]
})
export class TopBarLandingPageComponent {

  show: boolean = false;


  get stateName(){
    return this.show ? 'show' : 'hide'
  }
  toggle(){
    this.show = !this.show
  }

}
