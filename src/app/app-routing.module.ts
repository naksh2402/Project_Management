import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { TeamDashboardComponent } from './component/team-dashboard/team-dashboard.component';

const routes: Routes = [
{path:'',redirectTo:'auth',pathMatch:'full'},
{path:'auth',component:AuthComponent},
{path:'admin',component:AdminDashboardComponent},
{path:'team',component:TeamDashboardComponent},
{path:'**',redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
