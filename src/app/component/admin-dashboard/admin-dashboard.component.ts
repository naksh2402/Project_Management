import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { TeamDashboardService } from 'src/app/services/team-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];
  users: User[] = [];
  teamMembers: User[] = [];

  constructor(
    private adminService: AdminDashboardService,
    private taskService: TaskService,
    private userService: UserService,
    private teamService: TeamDashboardService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadTeamMembers();
  }

  loadData(): void {
    this.adminService.getAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
    this.adminService.getAllTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
    this.adminService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  loadTeamMembers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.teamMembers = users.filter(user => user.role === 'team');
    });
  }

  assignTask(task: Task, assignedUserId: string): void {
    if (task.id && assignedUserId) {
      this.taskService.assignTask(task.id, assignedUserId).subscribe(
        () => {
          task.assignedUserId = assignedUserId;
          task.status = 'inProgress';
          console.log('Task assigned and status updated successfully',task,assignedUserId);
        },
        error => {
          console.error('Error assigning task:', error);
        }
      );
    }
     this.teamService.updateTaskStatus(task.id??'', 'inProgress').subscribe((data)=>{
       console.log("Nice",data);

     });
  }

  // Event handler to safely extract the selected value
  onAssignChange(task: Task, event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      const value = target.value;
      this.assignTask(task, value);
    } else {
      console.error('Select element not found.');
    }
  }
  getAssignedMemberEmail(task: Task): string | undefined {
  return this.teamMembers?.find(member => member.id === task.assignedUserId)?.email;
}
}
