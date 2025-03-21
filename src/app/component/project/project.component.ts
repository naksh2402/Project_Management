import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  newProjectName: string = '';
  newProjectDescription: string = '';
  selectedProject: Project | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  createProject(): void {
    if (!this.newProjectName || !this.newProjectDescription) {
      alert('Please fill all fields.');
      return;
    }
    const project: Project = {
      name: this.newProjectName,
      description: this.newProjectDescription
    };
    this.projectService.addProject(project).subscribe(() => {
      this.newProjectName = '';
      this.newProjectDescription = '';
      this.loadProjects();
    });
  }

  editProject(project: Project): void {
    this.selectedProject = { ...project };
  }

  updateProject(): void {
    if (this.selectedProject && this.selectedProject.id) {
      this.projectService.updateProject(this.selectedProject).subscribe(() => {
        this.selectedProject = null;
        this.loadProjects();
      });
    }
  }

  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  cancelEdit(): void {
    this.selectedProject = null;
  }
}
