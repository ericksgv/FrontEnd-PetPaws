import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLandingPageComponent } from './top-bar-landing-page.component';

describe('TopBarLandingPageComponent', () => {
  let component: TopBarLandingPageComponent;
  let fixture: ComponentFixture<TopBarLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarLandingPageComponent]
    });
    fixture = TestBed.createComponent(TopBarLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
