import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaskAssignmentComponent } from './admin-task-assignment.component';

describe('AdminTaskAssignmentComponent', () => {
  let component: AdminTaskAssignmentComponent;
  let fixture: ComponentFixture<AdminTaskAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTaskAssignmentComponent]
    });
    fixture = TestBed.createComponent(AdminTaskAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
