import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  private menuVisibilitySubject = new BehaviorSubject<boolean>(false);
  menuVisibility$ = this.menuVisibilitySubject.asObservable();
  private visibilidadMenu: boolean = false;

  constructor() { }

  getVisibilidadMenu(): boolean{
    return this.visibilidadMenu
  }

  public cambiarVisibilidadMenu(): void{
    this.menuVisibilitySubject.next(!this.menuVisibilitySubject.value);
  }
}
