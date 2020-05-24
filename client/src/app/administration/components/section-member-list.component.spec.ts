import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMemberListComponent } from './section-member-list.component';

describe('SectionMemberListComponent', () => {
  let component: SectionMemberListComponent;
  let fixture: ComponentFixture<SectionMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionMemberListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
