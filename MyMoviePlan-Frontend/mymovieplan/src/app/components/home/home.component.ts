import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Movies } from 'src/app/Models/Movie.model';
import { MovieShows } from 'src/app/Models/MovieShows.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { constant } from 'src/app/services/helper';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  movies!: Movies[];


  carousel = new BehaviorSubject<Movies[]>(this.movies);
  carousel$ = this.carousel.asObservable();

  nowPlaying = new BehaviorSubject<Movies[]>(this.movies);
  nowPlaying$ = this.nowPlaying.asObservable();

  upComing = new BehaviorSubject<Movies[]>(this.movies);
  upComing$ = this.upComing.asObservable();

  constructor(private _appService: ApplicationService,
    private _activeRoute: ActivatedRoute,
    
    private _userService: UserService,
    private _globalService:GlobalService,
    private _movieService:MovieService){}
 

  
  ngOnInit(): void {

    
    // this._appService.getFewNowPlayingMovies().subscribe(movies => this.nowPlaying.next(movies));
    this._globalService.getFewNowPlayingMovies().subscribe(movies => this.nowPlaying.next(movies));
    // console.log(this.nowPlaying$);

    //this._appService.getFewUpComingMovies().subscribe(movies => this.upComing.next(movies));
    this._globalService.getFewUpComingMovies().subscribe(movies=> this.upComing.next(movies));

   // this._appService.getAllNowPlayingAndUpComingMovies().subscribe(movies => this.carousel.next(movies));
   this._globalService.getAllNowPlayingAndUpComing().subscribe(movies=> this.carousel.next(movies));

    
  }

  formatRelease(release: any): string {
    if (new Date(release) > new Date())
      return 'Releasing on ' + constant.formatDate(release);
    return 'Now Playing';
  }

}
