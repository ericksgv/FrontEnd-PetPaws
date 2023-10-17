import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarOscuroComponent } from './top-bar-oscuro.component';

describe('TopBarOscuroComponent', () => {
  let component: TopBarOscuroComponent;
  let fixture: ComponentFixture<TopBarOscuroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarOscuroComponent]
    });
    fixture = TestBed.createComponent(TopBarOscuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
