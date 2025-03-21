import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';
import { AdminAuthGuard } from './gaurds/admin-auth.gaurd';
import { TeamAuthGuard } from './gaurds/team-auth.gaurd';
import { ProjectComponent } from './component/project/project.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { TaskComponent } from './component/task/task.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminDashboardComponent,canActivate: [AdminAuthGuard] },
  { path: 'team', component: TeamDashboardComponent,canActivate: [TeamAuthGuard] },
  { path: 'projects', component: ProjectComponent, canActivate: [AdminAuthGuard]},
  { path: 'tasks', component: TaskComponent,canActivate: [AdminAuthGuard] },
  { path: 'users', component: UserListComponent,canActivate: [AdminAuthGuard]},
  { path: '**', redirectTo: '/auth' }
];



// const routes: Routes = [
//   // Public route for authentication (login/signup)
//   { path: 'auth', component: AuthComponent },

//   // Protected admin routes (only accessible by users with admin role)
//   {
//     path: 'admin',
//     component: AdminDashboardComponent,
//     canActivate: [AdminAuthGuard],
//     // Optionally, you could set up child routes for project, task, and user management:
//     // children: [
//     //   { path: 'projects', component: ProjectComponent },
//     //   { path: 'tasks', component: TaskComponent },
//     //   { path: 'users', component: UserListComponent },
//     // ]
//   },

//   // Protected team member routes
//   {
//     path: 'team',
//     component: TeamDashboardComponent,
//     canActivate: [TeamAuthGuard]
//     // Optionally, child routes could be added for specific task details etc.
//   },
//   { path: '**', redirectTo: '/auth' }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
