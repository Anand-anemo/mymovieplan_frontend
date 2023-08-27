import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Movies } from 'src/app/Models/Movie.model';
import { MovieShows } from 'src/app/Models/MovieShows.model';
import { Shows } from 'src/app/Models/Shows.model';
import { Theatre } from 'src/app/Models/Theatre.model';
import { MovietoshowsComponent } from 'src/app/components/movietoshows/movietoshows.component';
import { ShowsformComponent } from 'src/app/components/showsform/showsform.component';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { constant } from 'src/app/services/helper';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  allAuditoriums!: Theatre[];

  allMovies!: Movies[];

  selectedCinemaHallId!: number;

  selectedShowId!: number;

  selectedShows!: Shows[];

  selectedMovieShows!: MovieShows[];

  constructor(private _router: Router,
    private _dialog: MatDialog,

    private _globalService: GlobalService,

    private _activeRoute: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private _appservice:ApplicationService,
    private _theatreService:TheatreService
    ) { }

  ngOnInit(): void {

    this._globalService.getTheatre()
      .subscribe(halls => this.allAuditoriums = halls);

    this._globalService.getAllMovies()
      .subscribe(movies => this.allMovies = movies);

    this._activeRoute.queryParams
      .subscribe(param => {
        if (param['movie-added'])
          this._snackbar.open('movie added', '', {
            duration: 3000,
          })
        else if (param['auditorium-added'])
          this._snackbar.open('theatreadded', '', {
            duration: 3000,
          })
        // else if (param['show-added'])
        //   this._alertService.postionAlert('Show Added');
        // else if (param['movie-show-added'])
        //   this._alertService.postionAlert('Movie Show Added');
      });

  }
  
  onCinemaHallSelect(auditoriumId: number): void {
    this.selectedCinemaHallId = auditoriumId;
    console.log(this.selectedCinemaHallId);
    // this.selectedShows = this.allAuditoriums.find(
    //   (hall) => hall.tid == auditoriumId
    // )?.shows!;
    this._theatreService.findAllShows(auditoriumId).subscribe({
      next:(res)=>{
        this.selectedShows=res;
      }
    });
    console.log(this.selectedShows);
    this.selectedShowId = 0;
    this.selectedMovieShows = [];
  }

  onShowSelect(showId: number): void {
    this.selectedShowId = showId;
    console.log(this.selectedShowId);

    this._appservice.findAllMovieShows(showId).subscribe({
      next:(res:any)=>{
        this.selectedMovieShows=res
      }
    });
    console.log(this.selectedMovieShows);


    // this.selectedMovieShows = this.selectedShows.find((show) => show.showid == showId)
    //   ?.movieShows!;
      console.log(this.selectedMovieShows);

      
  }

  getShowMovieName(movieId: number): string {
    return this.allMovies.find(movie => movie.movieid == movieId)?.movieName!;
  }
  getShowMovieLanguage(movieId: number): string {
    return this.allMovies.find(movie => movie.movieid == movieId)?.language!;
  }

  getMovieImage(movieId: number): string {
    return this.allMovies.find(movie => movie.movieid == movieId)?.imageurl!;
  }

  onAddCinemaHall(): void {
    this._router.navigate(['./addtheatre']);
  }

  onAddMovie(): void {
    this._router.navigate(['./addmovies']);
  }

  onAddShow(): void {
    const dialog = this._dialog.open(ShowsformComponent, {
      width: '80%',
      data: this.selectedShows
    })

    dialog.afterClosed().subscribe(result => {
      if (result?.show) {
        this._appservice.addShow(this.selectedCinemaHallId, result.show)
          .subscribe(
            res => {
              this._globalService.addShow(this.selectedCinemaHallId, res)
              this._snackbar.open('show added','',{
                duration:3000,
              })
              // this.selectedShows.push(res);
            },
            err => this._snackbar.open('something went wrong','',{
              duration:3000,

            })
          );
      }
    },
      (error) => console.log(error)
    );

  }

  onAddMovieToTheShow(): void {
    const movieShows = this.selectedShows.
      find(show => show.showid == this.selectedShowId)?.movieShows;
    const dialog = this._dialog.open(MovietoshowsComponent, {
      width: '90%',
      data: {
        shows: movieShows,
        movies: this.allMovies
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result?.movieShow) {
        this._appservice.addMovieShow(this.selectedCinemaHallId, this.selectedShowId, result.movieShow)
          .subscribe(
            res => {
              console.log(res);
              if (res) {
                this._globalService.addMovieShows(this.selectedCinemaHallId, this.selectedShowId, res);
                this._snackbar.open('movie added to show ','',{
                  duration:3000,
                })
              }
              // this.selectedShows.find(show => show.id == this.selectedShowId)?.movieShows?.push(res);
            },
            err => this._snackbar.open('somethingwent wrong','',{
              duration:3000,
            })
          );
      }
    })
  }

  formatTime(time: string): string {
    return constant.formatTimeToAmOrPm(time);
  }

  onEditCinemaHall(auditoriumId: number): void {
    alert(`edit ${auditoriumId}`);
  }

  onDeleteCinemaHall(auditoriumId: number): void {
    alert(`delete ${auditoriumId}`);
  }

  onEditShow(showId: number): void {
    alert(`edit show ${showId}`);
  }

  onDeleteShow(showId: number): void {
    alert(`delete show: ${showId}`);
  }

  onEditMovie(movieId: number): void {
    alert(`edit movie ${movieId}`);
  }

  onDeleteMovie(movieId: number): void {
    alert(`delete movie ${movieId}`);
  }





}


