import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectionFormComponent } from './create-section-form.component';

describe('CreateSectionFormComponent', () => {
  let component: CreateSectionFormComponent;
  let fixture: ComponentFixture<CreateSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
