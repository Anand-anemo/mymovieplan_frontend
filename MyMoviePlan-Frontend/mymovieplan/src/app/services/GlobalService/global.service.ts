import { Injectable } from '@angular/core';
import { Theatre } from 'src/app/Models/Theatre.model';
import { TheatreService } from '../theatre.service';
import { Observable, map, of } from 'rxjs';
import { Movies } from 'src/app/Models/Movie.model';
import { MovieService } from '../movie.service';
import { Shows } from 'src/app/Models/Shows.model';
import { MovieShows } from 'src/app/Models/MovieShows.model';
import { ApplicationService } from '../application/application.service';
import { TempSelectMembers } from 'src/app/Models/TempSelectMembers.model';
import { TempScreen } from 'src/app/Models/TempScreen.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private _theatreService:TheatreService,
    private _moviesService:MovieService,
    private _appservice:ApplicationService) { }

  private theatres: Theatre[] = [];
  private movies: Movies[] = [];
  private movieShows: MovieShows[] = [];
  private nowPlayingMovies: Movies[] = [];
  private upComingMovies: Movies[] = [];
  private AllNowPlayingAndUpComing:Movies[]=[];

  private tempSelectMembers!: TempSelectMembers;
  private tempScreen!: TempScreen;


  addtheatre(theatre: Theatre): void {
    this.theatres.push(theatre);
    console.table(this.theatres);
  }

  getTheatre(): Observable<Theatre[]> {
    if (!this.theatres || this.theatres.length < 1) {
      console.warn("Calling All Auditoriums");
      return this._theatreService.getTheatre().pipe(
        map(halls => {
          this.theatres = halls;
          console.table(this.theatres);
          return this.theatres;
        })
      );
    }
    else
      return of(this.theatres);
  }

  getTheatresNames(): Observable<string[]> {
    return this.getTheatre().pipe(
      map((halls: Theatre[]) => {
        return halls ? [...new Set(halls.map(hall => hall.theatreName))] : []
      })
    );
  }


  getAllMovies(): Observable<Movies[]> {
    if (!this.movies || this.movies.length < 1) {
      console.warn("Calling All Movies");
      return this._moviesService.getmovies().pipe(
        map((movies:any) => {
          this.movies = movies;
          return this.movies;
        })
      );
    }
    else
      return of(this.movies);
  }

  addShow(auditoriumId: number, show: Shows): void {
    let shows: Shows[] = this.theatres.find(hall => hall.tid == auditoriumId)?.shows!;
    if (!shows)
      shows = [];
    shows.push(show);
    console.table(shows);
  }

  addMovieShows(auditoriumId: number, showId: number, movieShow: MovieShows): void {
    let m_shows: MovieShows[] = this.theatres.find(hall => hall.tid == auditoriumId)?.shows.find(show => show.showid == showId)?.movieShows!;
    if (!m_shows)
      m_shows = [];
    m_shows.push(movieShow);
    console.table(m_shows);
  }

  // getAllMovieShows(): Observable<MovieShows[]> {
  //   if (!this.movieShows || this.movieShows.length < 1) {
  //     console.warn("Calling All Movie Shows");
  //     return this._appservice.getAllMovieShows().pipe(
  //       map(m_shows => {
  //         this.movieShows = m_shows;
  //         return this.movieShows;
  //       })
  //     );
  //   }
  //   else
  //     return of(this.movieShows);
  // }


  // getFewUpComingMovies(): Observable<Movies[]> {
  //   return this._appservice.getFewUpComingMovieShows().pipe(
  //     map(m_shows => {
  //       this.nowPlayingMovies = [];
  //       m_shows.forEach(m_show => {
  //         this.getAllMovies().subscribe(movies => {
  //           this.nowPlayingMovies.push(movies.find(movie => movie.id == m_show.movieId)!);
  //         });
  //       });
  //       return this.nowPlayingMovies;
  //     })
  //   );
  // }

  
  // getAllUpComingMovies(): Observable<Movies[]> {
  //   return this._appservice.getAllUpComingMovieShows().pipe(
  //     map(m_shows => {
  //       this.upComingMovies = [];
  //       m_shows.forEach(m_show => {
  //         this.getAllMovies().subscribe(movies => {
  //           this.upComingMovies.push(movies.find(movie => movie.movieid == m_show.movieid)!);
  //         });
  //       });
  //       console.error(this.upComingMovies);
  //       return this.upComingMovies;
  //     })
  //   );
  // }


  // getAllNowPlayingMovies(): Observable<Movies[]> {
  //   return this._appservice.getAllNowPlayingMovieShows().pipe(
  //     map(m_shows => {
  //       this.nowPlayingMovies = [];
  //       m_shows.forEach(m_show => {
  //         this.getAllMovies().subscribe(movies => {
  //           this.nowPlayingMovies.push(movies.find(movie => movie.movieid == m_show.movieid)!);
  //         });
  //       });
  //       return this.nowPlayingMovies;
  //     })
  //   );
  //   }
  getAllNowPlayingAndUpComing(): Observable<Movies[]> {
    return this._appservice.getAllNowPlayingAndUpComingMovieShows().pipe(
      map(m_shows => {
        this.AllNowPlayingAndUpComing = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.AllNowPlayingAndUpComing.push(movies.find(movie => movie.movieid == m_show.movieid)!);
          });
        });
        return this.AllNowPlayingAndUpComing;
      })
    );
  }

  getFewNowPlayingMovies(): Observable<Movies[]> {
    return this._appservice.getFewNowPlayingMovieShows().pipe(
      map(m_shows => {
        this.nowPlayingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.nowPlayingMovies.push(movies.find(movie => movie.movieid == m_show.movieid)!);
          });
        });
        return this.nowPlayingMovies;
      })
    );
  }

  getFewUpComingMovies(): Observable<Movies[]> {
    return this._appservice.getFewUpComingMovieShows().pipe(
      map(m_shows => {
        this.upComingMovies = [];
        m_shows.forEach(m_show => {
          this.getAllMovies().subscribe(movies => {
            this.upComingMovies.push(movies.find(movie => movie.movieid == m_show.movieid)!);
          });
        });
        return this.upComingMovies;
      })
    );
  }

  setTempSelectMembers(tempSelectMembers: TempSelectMembers): void {
    this.tempSelectMembers = tempSelectMembers;
  }

  getTempSelectMembers(): TempSelectMembers {
    return this.tempSelectMembers;
  }

  setTempScreen(tempScreen: TempScreen): void {
    this.tempScreen = tempScreen;
  }

  getTempScreen(): TempScreen {
    return this.tempScreen;
  }




}
