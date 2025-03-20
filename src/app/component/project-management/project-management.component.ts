import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { id: '', name: '', description: '', createdBy: '' };
  editProject: Project | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data:any) => {
      this.projects = data.map((a:any) => {
        const project = a.payload.val() as Project;
        project.id = a.payload.key;
        return project;
      });
    });
  }

  addProject(): void {
    if (!this.newProject.name || !this.newProject.description) { return; }
    this.newProject.createdBy = 'admin'; // Example value
    this.projectService.createProject(this.newProject).then(() => {
      this.loadProjects();
      this.newProject = { id: '', name: '', description: '', createdBy: '' };
    });
  }

  setEditProject(project: Project): void {
    this.editProject = { ...project };
  }

  updateProject(): void {
    if (this.editProject && this.editProject.id) {
      this.projectService.updateProject(this.editProject.id, this.editProject).then(() => {
        this.loadProjects();
        this.editProject = null;
      });
    }
  }

  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).then(() => {
        this.loadProjects();
});
}
}
}
