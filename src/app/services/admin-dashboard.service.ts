import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  // Replace with your Firebase Realtime Database URL
  private firebaseDbUrl = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient) {}

  // Firebase REST endpoints return objects. Here we convert them to arrays.
  getAllProjects(): Observable<Project[]> {
    return this.http.get<{ [key: string]: Project }>(`${this.firebaseDbUrl}/projects.json`)
      .pipe(map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []));
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<{ [key: string]: Task }>(`${this.firebaseDbUrl}/tasks.json`)
      .pipe(map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ [key: string]: User }>(`${this.firebaseDbUrl}/users.json`)
      .pipe(map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []));
  }
}
