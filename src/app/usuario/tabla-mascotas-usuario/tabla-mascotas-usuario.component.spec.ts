import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMascotasUsuarioComponent } from './tabla-mascotas-usuario.component';

describe('TablaMascotasUsuarioComponent', () => {
  let component: TablaMascotasUsuarioComponent;
  let fixture: ComponentFixture<TablaMascotasUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaMascotasUsuarioComponent]
    });
    fixture = TestBed.createComponent(TablaMascotasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
