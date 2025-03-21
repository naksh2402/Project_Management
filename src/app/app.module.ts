import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../../src/environment/environment'


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
  ],
  providers: [AdminAuthGuard,TeamAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule{}
