import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSheetComponent } from './navigation-sheet.component';

describe('NavigationSheetComponent', () => {
  let component: NavigationSheetComponent;
  let fixture: ComponentFixture<NavigationSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationSheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
