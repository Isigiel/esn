import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvitePageComponent } from './create-invite-page.component';

describe('CreateInvitePageComponent', () => {
  let component: CreateInvitePageComponent;
  let fixture: ComponentFixture<CreateInvitePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInvitePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
