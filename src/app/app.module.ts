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

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    TeamDashboardComponent,
    AuthComponent
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
