import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './forms/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './forms/register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import{ HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './forms/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './forms/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './forms/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './forms/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './forms/admin/welcome/welcome.component';
import { ViewGenresComponent } from './forms/admin/view-genres/view-genres.component';
import { AddGenresComponent } from './forms/admin/add-genres/add-genres.component';
import { ViewTheaterComponent } from './forms/admin/view-theater/view-theater.component';
import { AddTheatreComponent } from './forms/admin/add-theatre/add-theatre.component';
import {MatSelectModule} from '@angular/material/select';
import { AddMoviesComponent } from './forms/admin/add-movies/add-movies.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddmovietotheatreComponent } from './forms/admin/addmovietotheatre/addmovietotheatre.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewGenresComponent,
    AddGenresComponent,
    ViewTheaterComponent,
    AddTheatreComponent,
    AddMoviesComponent,
    AddmovietotheatreComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule

    

    
    

    

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
