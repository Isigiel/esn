import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCreateDialog } from './section-create.dialog';

describe('SectionCreateDialog', () => {
  let component: SectionCreateDialog;
  let fixture: ComponentFixture<SectionCreateDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionCreateDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCreateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
