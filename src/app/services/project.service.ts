import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private firebaseDbUrl = environment.firebaseConfig.databaseURL;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<{ [key: string]: Project }>(`${this.firebaseDbUrl}/projects.json`)
      .pipe(
        map(data => data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [])
      );
  }

  addProject(project: Project): Observable<any> {
    return this.http.post(`${this.firebaseDbUrl}/projects.json`, project);
  }

  updateProject(project: Project): Observable<any> {
    if (!project.id) throw new Error('Project ID is required for update.');
    return this.http.patch(`${this.firebaseDbUrl}/projects/${project.id}.json`, project);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.firebaseDbUrl}/projects/${projectId}.json`);
  }
}
