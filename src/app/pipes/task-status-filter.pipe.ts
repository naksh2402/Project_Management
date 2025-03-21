import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: 'pending' | 'inProgress' | 'completed'): Task[] {
    if (!tasks) return [];
    return tasks.filter(task => task.status === status);
  }
}
