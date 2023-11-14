import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-top-bar-landing-page',
  templateUrl: './top-bar-landing-page.component.html',
  styleUrls: ['./top-bar-landing-page.component.css', '../top-bar.component.css', '../../../styles.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300) // You can adjust the duration (300ms in this example)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0 })) // You can adjust the duration (300ms in this example)
      ])
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
