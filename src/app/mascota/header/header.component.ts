import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() titleColor: string = ''; // Propiedad de entrada para titleColor
  @Input() backgroundColor: string = ''; // Propiedad de entrada para backgroundColor

  constructor() {}

  ngOnInit(): void {}
}


