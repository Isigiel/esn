import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionPageComponent } from './view-section-page.component';

describe('ViewSectionPageComponent', () => {
  let component: ViewSectionPageComponent;
  let fixture: ComponentFixture<ViewSectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSectionPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
