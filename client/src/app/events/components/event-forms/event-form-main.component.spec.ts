import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormMainComponent } from './event-form-main.component';

describe('EventFormMainComponent', () => {
  let component: EventFormMainComponent;
  let fixture: ComponentFixture<EventFormMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventFormMainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
