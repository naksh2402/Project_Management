import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskStatusFilter'
})
export class TaskStatusFilterPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    if (!tasks || !status) {
      return tasks;
    }
    return tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
}
}