import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';
import { AuthComponent } from './auth/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { provideFirebaseApp,initializeApp } from '@angular/fire/app';
import {getAuth,provideAuth} from '@angular/fire/auth'
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import { ProjectListComponent } from './component/project-list/project-list.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TaskDetailsComponent } from './component/task-details/task-details.component';
import { ProjectDetailsComponent } from './component/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    TeamDashboardComponent,
    AuthComponent,
    ProjectListComponent,
    TaskListComponent,
    NavbarComponent,
    TaskDetailsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
   provideFirebaseApp(()=>initializeApp(environment.firebase)),
   provideAuth(()=> getAuth()),
   provideFirestore(()=>getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
