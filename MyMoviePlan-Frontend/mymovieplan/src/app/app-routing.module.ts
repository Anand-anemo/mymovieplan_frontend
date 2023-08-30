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
import { ViewGenresComponent } from './forms/admin/view-genres/view-genres.component';
import { AddGenresComponent } from './forms/admin/add-genres/add-genres.component';
import { ViewTheaterComponent } from './forms/admin/view-theater/view-theater.component';
import { AddTheatreComponent } from './forms/admin/add-theatre/add-theatre.component';
import { AddMoviesComponent } from './forms/admin/add-movies/add-movies.component';
import { AddmovietotheatreComponent } from './forms/admin/addmovietotheatre/addmovietotheatre.component';
import { ManageComponent } from './forms/admin/manage/manage.component';
import { ShowsformComponent } from './components/showsform/showsform.component';
import { MovietoshowsComponent } from './components/movietoshows/movietoshows.component';
import { MoviesComponent } from './components/movies/movies.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MovieComponent } from './components/movie/movie.component';
import { ScreenComponent } from './components/screen/screen.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {
    path:'' , component:LayoutComponent,
    children:[{
      path:'' , redirectTo:'/home' ,pathMatch:'full'

    },
    {

      path:'home', component:HomeComponent

    },
      {
        path:'movies',component:MoviesComponent,canActivate:[UserGuard]
      },
      {
        path:'movie/:movieid',component:MovieComponent
      },
      {
        path:'select-seats',component:ScreenComponent,canActivate:[UserGuard]

      },
      {
        path:'payment',component:PaymentComponent,canActivate:[UserGuard]
      },
      {
        path:'booking',component:BookingComponent,canActivate:[UserGuard]
      }
      
    ]
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
      },
      {
        path:'viewgenres',
        component:ViewGenresComponent

      },
      {
        path:'addgenre',
        component:AddGenresComponent
      },
      {
        path:'viewtheater',
        component:ViewTheaterComponent
      },
      {
        path:'addtheatre',
        component:AddTheatreComponent
      },
      {
        path:'addmovies' , 
        component:AddMoviesComponent
      },
      {
        path:'addmovietotheatre',
        component:AddmovietotheatreComponent
      },
      {
        path:'manage',
        component:ManageComponent
      },
      {
        path:'shows',
        component:ShowsformComponent
      },
      {
        path:"movietoshows",
        component:MovietoshowsComponent
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
