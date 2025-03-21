import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamDashboardService } from '../../services/team-dashboard.service';
import { Task } from '../../models/task.model';
import { AuthService } from '../../services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit,OnDestroy {
  tasks: Task[] = [];
  currentUser: any;
  private taskListSubscription!: Subscription;
  constructor(
    private teamService: TeamDashboardService,
    private authService: AuthService
    ,private taskService: TaskService
  ) {}


  ngOnInit(): void {
    this.taskListSubscription=this.teamService.taskList$.subscribe((tasks: Task[]) => {
    this.tasks = tasks;
  });
    this.currentUser = this.authService.getCurrentUser();
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.currentUser && this.currentUser.id) {
      this.teamService.getTasksForUser(this.currentUser.id).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    }
  }
  onAssignChange(task: Task, event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  if (target) {
    const value = target.value;
    if (task.id) { 
      this.taskService.assignTask(task.id, value);
    } else {
      console.error('Task ID is missing.');
    }
  } else {
    console.error('Select element not found.');
  }
}
ngOnDestroy(): void {
 if (this.taskListSubscription) {
    this.taskListSubscription.unsubscribe();
  }}

}

