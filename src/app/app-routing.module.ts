import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './gaurds/admin-auth.gaurd';
import { TeamAuthGuard } from './gaurds/team-auth.gaurd';
import { ProjectComponent } from './component/project/project.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { TaskComponent } from './component/task/task.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminDashboardComponent,canActivate: [AdminAuthGuard] },
  { path: 'team',component:TeamDashboardComponent, canActivate: [TeamAuthGuard] },
  { path: 'projects', component: ProjectComponent, canActivate: [AdminAuthGuard]},
  { path: 'tasks', component: TaskComponent,canActivate: [AdminAuthGuard] },
  { path: 'users', component: UserListComponent,canActivate: [AdminAuthGuard]},
  { path: '**', redirectTo: '/auth' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
