import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMembershipDialogComponent } from './edit-membership-dialog.component';

describe('EditMembershipDialogComponent', () => {
  let component: EditMembershipDialogComponent;
  let fixture: ComponentFixture<EditMembershipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditMembershipDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
