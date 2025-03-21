import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamDashboardService {
  // Replace with your Firebase Realtime Database URL
  private firebaseDbUrl = environment.firebaseConfig.databaseURL;
  private taskListSubject = new Subject<Task[]>();
 public taskList$ = this.taskListSubject.asObservable();
  constructor(private http: HttpClient) {}



  getTasksForUser(userId: string): Observable<Task[]> {
  return this.http.get<{ [key: string]: Task }>(
    `${this.firebaseDbUrl}/tasks.json?orderBy="\"assignedUserId\""&equalTo="\"${userId}\""`
  ).pipe(
    map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
  );
}

public updateTaskList(tasks: Task[]): void {
  this.taskListSubject.next(tasks);
}

 updateTaskStatus(taskId: string, status: 'pending' | 'inProgress' | 'completed'): Observable<any> {
  return this.http.patch(`${this.firebaseDbUrl}/tasks/${taskId}.json`, { status });
}

  addComment(taskId: string, comment: string): Observable<any> {
    return this.http.patch(`${this.firebaseDbUrl}/tasks/${taskId}.json`, { comments: comment });
  }
}
