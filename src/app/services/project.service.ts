import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Project } from '../models/project.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private db: AngularFireDatabase) {}

  getProjects(): Observable<any[]> {
    return this.db.list('projects').snapshotChanges().pipe(
      map(actions =>
        actions
          .filter(a => a.payload.exists()) // Check if snapshot exists
          .map(a => ({
            id: a.payload.key,
            ...(a.payload.val() as object)
          }))
      )
    );
  }



  createProject(project: Project) {
    return this.db.list('projects').push(project);
  }

  updateProject(projectId: string, project: Partial<Project>) {
    return this.db.object(`projects/ ${projectId}`).update(project);
  }

  deleteProject(projectId: string) {
    return this.db.object(`projects/${projectId}`).remove();
}
}