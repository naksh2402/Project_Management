import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

interface TeamMember {
  id: string;
  name: string;
}

@Component({
  selector: 'app-admin-task-assignment',
  templateUrl: './admin-task-assignment.component.html',
  styleUrls: ['./admin-task-assignment.component.css']
})
export class AdminTaskAssignmentComponent implements OnInit {
  tasks: Task[] = [];
  teamMembers: TeamMember[] = [];
  selectedTask: Task | null = null;
  selectedMember: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadTeamMembers();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.map((a:any) => {
        const task = a.payload.val() as Task;
        task.id = a.payload.key;
        return task;
      });
    });
  }

  loadTeamMembers(): void {
    // Dummy data – replace with real service call if needed.
    this.teamMembers = [
      { id: 'user1', name: 'Bob User' },
      { id: 'user2', name: 'Charlie Member' }
    ];
  }

  assignTask(task: Task): void {
    this.selectedTask = { ...task };
    this.selectedMember = task.assignedTo || '';
  }

  reassignTask(): void {
    if (this.selectedTask && this.selectedTask.id && this.selectedMember) {
      const updatedTask = { ...this.selectedTask, assignedTo: this.selectedMember };
      this.taskService.updateTask(this.selectedTask.id, updatedTask).then(() => {
        this.loadTasks();
        this.selectedTask = null;
        this.selectedMember = '';
});
}
}
}
