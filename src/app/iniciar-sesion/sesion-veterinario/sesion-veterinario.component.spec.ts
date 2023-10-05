import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionVeterinarioComponent } from './sesion-veterinario.component';

describe('SesionVeterinarioComponent', () => {
  let component: SesionVeterinarioComponent;
  let fixture: ComponentFixture<SesionVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SesionVeterinarioComponent]
    });
    fixture = TestBed.createComponent(SesionVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
