import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { TaskComponent } from './component/task/task.component';
import { ProjectComponent } from './component/project/project.component';
import { AdminAuthGuard } from './gaurds/admin-auth.gaurd';
import { TeamAuthGuard } from './gaurds/team-auth.gaurd';
import { TaskStatusPipe } from './pipes/task-status-filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminDashboardComponent,
    TeamDashboardComponent,
    NavbarComponent, 
    TaskComponent,
    ProjectComponent,
    UserListComponent,
    TaskStatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
      ToastrModule.forRoot(),
  ],
  providers: [AdminAuthGuard,TeamAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule{}
