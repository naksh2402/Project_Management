import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Task } from '../models/task.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private db: AngularFireDatabase) {}


  getTasks(): Observable<any[]> {
    return this.db.list('tasks').snapshotChanges().pipe(
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



  createTask(task: Task) {
    return this.db.list('tasks').push(task);
  }

  updateTask(taskId: string, task: Partial<Task>) {
    return this.db.object(`tasks/${taskId}`).update(task);
  }

  deleteTask(taskId: string) {
    return this.db.object(`tasks/${taskId}`).remove();
}
}
