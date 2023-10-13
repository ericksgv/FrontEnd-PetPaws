import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarClienteComponent } from './top-bar-cliente.component';

describe('TopBarClienteComponent', () => {
  let component: TopBarClienteComponent;
  let fixture: ComponentFixture<TopBarClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarClienteComponent]
    });
    fixture = TestBed.createComponent(TopBarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
