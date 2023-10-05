import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionUsuarioComponent } from './sesion-usuario.component';

describe('SesionUsuarioComponent', () => {
  let component: SesionUsuarioComponent;
  let fixture: ComponentFixture<SesionUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SesionUsuarioComponent]
    });
    fixture = TestBed.createComponent(SesionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
