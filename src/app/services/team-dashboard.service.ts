import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamDashboardService {
  private firebaseDbUrl = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient) {}


  getTasksForUser(userId: string): Observable<Task[]> {

    const url = `${this.firebaseDbUrl}/tasks.json`;
    console.log("Constructed URL:", url);
    return this.http.get<{ [key: string]: Task }>(url).pipe(
      map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
    );
  }


  updateTaskStatus(taskId: string, status: 'pending' | 'inProgress' | 'completed'): Observable<any> {
    return this.http.patch(`${this.firebaseDbUrl}/tasks/${taskId}.json`, { status });
  }


  addComment(taskId: string, comments: string[]): Observable<any> {
    return this.http.patch(`${this.firebaseDbUrl}/tasks/${taskId}.json`, { comments });
  }
}
