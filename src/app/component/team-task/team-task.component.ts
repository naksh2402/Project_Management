import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css']
})
export class TeamTaskComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data:any) => {
      this.tasks = data.map((a:any) => {
        const task = a.payload.val() as Task;
        task.id = a.payload.key;
        return task;
      });
    });
  }

  setSelectedTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  updateTask(): void {
    if (this.selectedTask && this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).then(() => {
        this.loadTasks();
        this.selectedTask = null;
      });
    }
  }
}
