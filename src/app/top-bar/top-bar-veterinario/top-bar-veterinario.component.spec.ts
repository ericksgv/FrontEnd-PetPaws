import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarVeterinarioComponent } from './top-bar-veterinario.component';

describe('TopBarVeterinarioComponent', () => {
  let component: TopBarVeterinarioComponent;
  let fixture: ComponentFixture<TopBarVeterinarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarVeterinarioComponent]
    });
    fixture = TestBed.createComponent(TopBarVeterinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
