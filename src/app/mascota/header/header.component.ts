import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() titleColor: string = 'acento-verde-claro-texto';
  @Input() backgroundColor: string = 'acento-amarillo-claro-fondo';
}
