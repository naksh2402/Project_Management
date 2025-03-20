import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTaskComponent } from './team-task.component';

describe('TeamTaskComponent', () => {
  let component: TeamTaskComponent;
  let fixture: ComponentFixture<TeamTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamTaskComponent]
    });
    fixture = TestBed.createComponent(TeamTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
