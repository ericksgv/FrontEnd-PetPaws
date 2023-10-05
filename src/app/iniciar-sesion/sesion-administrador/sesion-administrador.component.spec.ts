import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionAdministradorComponent } from './sesion-administrador.component';

describe('SesionAdministradorComponent', () => {
  let component: SesionAdministradorComponent;
  let fixture: ComponentFixture<SesionAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SesionAdministradorComponent]
    });
    fixture = TestBed.createComponent(SesionAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
