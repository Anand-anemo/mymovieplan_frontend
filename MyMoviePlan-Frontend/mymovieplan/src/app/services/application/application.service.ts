import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shows } from 'src/app/Models/Shows.model';
import baseUrl from '../helper';
import { MovieShows } from 'src/app/Models/MovieShows.model';
import { Movies } from 'src/app/Models/Movie.model';
import { Theatre } from 'src/app/Models/Theatre.model';
import { BookedSeats } from 'src/app/Models/BookedSeats.model';
import { Booking } from 'src/app/Models/Booking.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private _http:HttpClient) { }

  addShow(auditoriumId: number, show: Shows): Observable<Shows> {
    return this._http.post<Shows>(`${baseUrl}/theatre/${auditoriumId}/shows/add`, show);
  }

  addMovieShow(auditoriumId: number, showId: number, movieShow: MovieShows): Observable<MovieShows> {
    return this._http.post<MovieShows>(`${baseUrl}/theatre/${auditoriumId}/show/${showId}/movieShow/add`, movieShow);
  }

  

  
  getMovieShow(movieShowId: number): Observable<MovieShows> {
    return this._http.get<MovieShows>(`${baseUrl}/movieshow/${movieShowId}`);
  }

  public findAllMovieShows(showId:number){
    return this._http.get<MovieShows>(`${baseUrl}/show/${showId}/movie-show/all`);
  }
//moviecontroller
  getFewNowPlayingMovies(): Observable<Movies[]> {
  
    return this._http.get<Movies[]>(`${baseUrl}/movies/now-playing`);
  }
//moveiscontroller
  getFewUpComingMovies(): Observable<Movies[]> {
    
    return this._http.get<Movies[]>(`${baseUrl}/movies/up-coming`);
  }

//moviecontroller
  getAllNowPlayingAndUpComingMovies(): Observable<Movies[]> {
    return this._http.get<Movies[]>(`${baseUrl}/movies/now-playing-up-coming`);
  }
//movieshowcontroller
  getAllNowPlayingAndUpComingMovieShows(): Observable<MovieShows[]> {
    return this._http.get<MovieShows[]>(`${baseUrl}/movieshow/now-playing-up-coming`, { headers: { skip: "true" } });
  }
//movieshowcontroller
getFewNowPlayingMovieShows(): Observable<MovieShows[]> {
  //let params = new HttpParams().set('records', '4');
  // let searchparam=new HttpParams();
  //   searchparam=searchparam.append('movieid',mid);
  //   searchparam=searchparam.append('tid',tid);
    

return this._http.get<MovieShows[]>(`${baseUrl}/movieshow/now-playing`,{headers: { skip: "true" } });
}

getFewUpComingMovieShows(): Observable<MovieShows[]> {
  
  return this._http.get<MovieShows[]>(`${baseUrl}/movieshow/up-coming` );
}

// getAllNowPlayingMovieShows(): Observable<MovieShows[]> {
//   return this._http.get<MovieShows[]>(GlobalConstants.NOW_PLAYING_MOVIE_SHOWS_URL, { headers: { skip: "true" } });
// }

// getAllUpComingMovieShows(): Observable<MovieShows[]> {
//   return this._http.get<MovieShows[]>(GlobalConstants.UP_COMING_MOVIE_SHOWS_URL, { headers: { skip: "true" } });
// }


getAuditoriumsByMovieId(movieId: number): Observable<Theatre[]> {
  return this._http.get<Theatre[]>(`${baseUrl}/theatre/movie/${movieId}`)
}

getShowsByMovieId(auditoriumId: number, movieId: number): Observable<Shows[]> {
  return this._http.get<Shows[]>(`${baseUrl}/theatre/${auditoriumId}/movie/${movieId}`)
}

getAllBookedSeats(movieShowId:number , on: Date): Observable<BookedSeats> {
  // new Date('Sun May 11,2014').toLocaleDateString('fr-CA')    2014-05-11
  // let params = new HttpParams().set('on', on.toISOString().slice(0, 10));
  // let params = new HttpParams().set('on', o);
  return this._http.get<BookedSeats>(`${baseUrl}/movieshow/${movieShowId}/booked-seats/${on.toLocaleDateString('fr-CA')}`);
}

addBooking(auditoriumId: number, showId: number, movieShowId: number, booking: Booking): Observable<Booking> {
  return this._http.post<Booking>(`${baseUrl}/theatre/${auditoriumId}/show/${showId}/movie-show/${movieShowId}/booking/add`, booking);
}

getAllUserBooking(userId: string): Observable<Booking[]> {
  return this._http.get<Booking[]>(`${baseUrl}/booking/${userId}/all`);
}




  
}
