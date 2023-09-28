import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMascotaComponent } from './agregar-mascota.component';

describe('AgregarMascotaComponent', () => {
  let component: AgregarMascotaComponent;
  let fixture: ComponentFixture<AgregarMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarMascotaComponent]
    });
    fixture = TestBed.createComponent(AgregarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
