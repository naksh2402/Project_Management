import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';
import { AuthGuard } from './auth/auth.gaurd';
import { ProjectManagementComponent } from './component/project-management/project-management.component';
import { AdminTaskAssignmentComponent } from './component/admin-task-assignment/admin-task-assignment.component';
import { TeamTaskComponent } from './component/team-task/team-task.component';
const routes: Routes = [
{path:'',redirectTo:'/auth',pathMatch:'full'},
{path:'auth',component:AuthComponent},
{path:'admin',component:AdminDashboardComponent, canActivate:[AuthGuard],data:{role:'admin'}},
{path:'admin/projects',component:ProjectManagementComponent, canActivate:[AuthGuard],data:{role:'admin'}},
{path:'admin/tasks/assign',component:AdminTaskAssignmentComponent, canActivate:[AuthGuard],data:{role:'admin'}},
{path:'team',component:TeamDashboardComponent, canActivate:[AuthGuard],data:{role:'teamMember'}},
{path:'team/tasks',component:TeamTaskComponent, canActivate:[AuthGuard],data:{role:'teamMember'}},
// {path:'projects',component:ProjectListComponent, canActivate:[AuthGuard],},
// {path:'tasks',component:TaskListComponent, canActivate:[AuthGuard]},
{path:'**',redirectTo:'/auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
