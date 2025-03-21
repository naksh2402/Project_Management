// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Replace with your Firebase Realtime Database URL
  private firebaseDbUrl = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient) {}

  // Create a new task
  addTask(task: Task): Observable<any> {
    return this.http.post(`${this.firebaseDbUrl}/tasks.json`, task);
  }

  // Retrieve all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<{ [key: string]: Task }>(`${this.firebaseDbUrl}/tasks.json`)
      .pipe(
        map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
      );
  }

  // Update an existing task
  updateTask(task: Task): Observable<any> {
    if (!task.id) throw new Error('Task ID is required for update.');
    return this.http.patch(`${this.firebaseDbUrl}/tasks/${task.id}.json`, task);
  }

  // Delete a task
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.firebaseDbUrl}/tasks/${taskId}.json`);
  }

  // Assign a task to a team member
  assignTask(taskId: string, assignedUserId: string): Observable<any> {
    const payload = {
      assignedUserId,
      status: 'inProgress'  // Automatically set status to inProgress upon assignment
    };
    return this.http.patch(`${this.firebaseDbUrl}/tasks/${taskId}.json`, payload);
  }
  
}

