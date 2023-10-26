import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionMascotaComponent } from './informacion-mascota.component';

describe('InformacionMascotaComponent', () => {
  let component: InformacionMascotaComponent;
  let fixture: ComponentFixture<InformacionMascotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionMascotaComponent]
    });
    fixture = TestBed.createComponent(InformacionMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
