import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { AuthGuard } from './auth/auth.gaurd';
const routes: Routes = [
{path:'',redirectTo:'/auth',pathMatch:'full'},
{path:'auth',component:AuthComponent},
{path:'admin',component:AdminDashboardComponent, canActivate:[AuthGuard],data:{role:'admin'}},
{path:'team',component:TeamDashboardComponent, canActivate:[AuthGuard],data:{role:'admin'}},
{path:'projects',component:ProjectListComponent, canActivate:[AuthGuard],},
{path:'projects',component:ProjectListComponent, canActivate:[AuthGuard],},
{path:'tasks',component:TaskListComponent, canActivate:[AuthGuard]},
{path:'**',redirectTo:'/auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
