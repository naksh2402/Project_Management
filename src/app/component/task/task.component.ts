import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  // Variables for creating a new task
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskProjectId: string = '';
  newTaskDeadline: string = '';
  
  // For editing a task
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Loads all tasks from Firebase.
  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Error fetching tasks:', error)
    );
  }

  // Creates a new task.
  createTask(): void {
    if (!this.newTaskTitle || !this.newTaskDescription || !this.newTaskProjectId || !this.newTaskDeadline) {
      alert('Please fill all required fields');
      return;
    }
    const newTask: Task = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      projectId: this.newTaskProjectId,
      deadline: this.newTaskDeadline,
      status: 'pending',   // Default status
      assignedUserId: '',  // Initially, no user is assigned
      comments: []
    };

    this.taskService.addTask(newTask).subscribe(
      () => {
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.newTaskProjectId = '';
        this.newTaskDeadline = '';
        this.loadTasks();
      },
      error => console.error('Error creating task:', error)
    );
  }

  // Prepares a task for editing.
  editTask(task: Task): void {
    // Create a shallow copy to edit
    this.selectedTask = { ...task };
  }

  // Updates the task.
  updateTask(): void {
    if (this.selectedTask && this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask).subscribe(
        () => {
          this.selectedTask = null;
          this.loadTasks();
        },
        error => console.error('Error updating task:', error)
      );
    }
  }

  // Deletes a task.
  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => this.loadTasks(),
        error => console.error('Error deleting task:', error)
      );
    }
  }

  // Cancel editing.
  cancelEdit(): void {
    this.selectedTask = null;
  }
}
