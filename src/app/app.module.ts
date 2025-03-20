import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../../src/environment/environment'

import { AuthComponent } from './auth/auth/auth.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { ProjectManagementComponent } from './component/project-management/project-management.component';
import { AdminTaskAssignmentComponent } from './component/admin-task-assignment/admin-task-assignment.component';
import { TeamTaskComponent } from './component/team-task/team-task.component';
import { TaskStatusFilterPipe } from './component/task-status-filter.pipe';
import { AuthGuard } from './auth/auth.gaurd';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminDashboardComponent,
    TeamDashboardComponent,
    NavbarComponent,
    ProjectManagementComponent,
    AdminTaskAssignmentComponent,
    TeamTaskComponent,
    TaskStatusFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule  // Now using Realtime Database module
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule{}
