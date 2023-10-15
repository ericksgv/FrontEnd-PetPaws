import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTratamientoComponent } from './agregar-tratamiento.component';

describe('AgregarTratamientoComponent', () => {
  let component: AgregarTratamientoComponent;
  let fixture: ComponentFixture<AgregarTratamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarTratamientoComponent]
    });
    fixture = TestBed.createComponent(AgregarTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
