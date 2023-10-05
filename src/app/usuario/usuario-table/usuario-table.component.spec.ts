import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTableComponent } from './usuario-table.component';

describe('UsuarioTableComponent', () => {
  let component: UsuarioTableComponent;
  let fixture: ComponentFixture<UsuarioTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioTableComponent]
    });
    fixture = TestBed.createComponent(UsuarioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
