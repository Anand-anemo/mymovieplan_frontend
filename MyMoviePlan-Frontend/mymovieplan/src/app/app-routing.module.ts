import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './forms/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './forms/register/register.component';
import { AdminDashboardComponent } from './forms/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './forms/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './forms/profile/profile.component';
import { WelcomeComponent } from './forms/admin/welcome/welcome.component';

const routes: Routes = [
  {
    path:'' , component:HomeComponent
  },
  {
    path:'login' , component:LoginComponent
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
   
    children:[
      {
        path:'',
        component:WelcomeComponent

      },
      {
        path:'profile',
        component:ProfileComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[UserGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
