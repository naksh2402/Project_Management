import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { AuthService } from '../../services/auth.service';
import { TeamDashboardService } from '../../services/team-dashboard.service';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  currentUser: any;
  private taskSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private teamService: TeamDashboardService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log("Current user:", this.currentUser);
    if (this.currentUser && this.currentUser.localId) {
      console.log("User ID:", this.currentUser.localId);
      this.taskSubscription = this.teamService.getTasksForUser(this.currentUser.localId)
        .subscribe({
          next: (tasks: Task[]) => {
            // Optionally filter tasks if needed
            this.tasks = tasks.filter(task => task.assignedUserId === this.currentUser.localId);
            console.log("Tasks fetched:", this.tasks);
          },
          error: (err: any) => {
            console.error("Error fetching tasks:", err);
          }
        });
    }
  }

  addComment(task: Task, commentInput: HTMLInputElement): void {
    const newComment = commentInput.value.trim();
    if (!newComment) return;

    let updatedComments: string[] = [];
    if (task.comments && Array.isArray(task.comments)) {
      updatedComments = [...task.comments, newComment];
    } else {
      updatedComments = [newComment];
    }
    // Call the service to update the comments in Firebase
    this.teamService.addComment(task.id as string, updatedComments).subscribe(
      () => {
        console.log('Comment added successfully');
        // Update the local object with the new comments array
        task.comments = updatedComments;
        commentInput.value = '';
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }
   markComplete(task: Task): void {
    if (task.id && task.status !== 'completed') {
      this.teamService.updateTaskStatus(task.id, 'completed').subscribe(
        () => {
          console.log('Task marked as complete');
          task.status = 'completed';
        },
        error => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
