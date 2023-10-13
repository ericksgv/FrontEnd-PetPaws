import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MenuServiceService } from './menu-service.service'


@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'open',
        style({
          height: '100%',
          display: 'block',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          display: 'none',
        })
      ),
      transition('closed <=> open', [animate('0.3s ease')]),
    ]),
  ],
})
export class DropdownMenuComponent {

  menuVisible: boolean = this.menuService.getVisibilidadMenu()

  constructor(private menuService: MenuServiceService) {
  }

  public MenuServiceService = MenuServiceService;


  ngOnInit() {
    this.menuService.menuVisibility$.subscribe((isVisible) => {
      this.menuVisible = isVisible;
    });
  }
}
