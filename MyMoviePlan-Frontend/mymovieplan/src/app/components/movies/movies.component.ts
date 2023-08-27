import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Movies } from 'src/app/Models/Movie.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { constant } from 'src/app/services/helper';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  
  showText = 'Now Playing';
  search?: string;
  languageFilter?: string;

  types = [
    'Now Playing',
    'Up Coming',
  ]

  movies!: Movies[];
  moviesList = new BehaviorSubject<Movies[]>(this.movies);
  moviesList$ = this.moviesList.asObservable();

  constructor( private _appService: ApplicationService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _globalService:GlobalService){}

  ngOnInit(): void {

    this._activeRoute.queryParams
    .subscribe(param => {
      const show = param['show'];
      if (show && show == 'up-coming') {
        this.showText = 'Up Coming';
        // this._appService.getAllUpComingMovies().subscribe(movies => this.moviesList.next(movies ? movies : this.movies));
        this._globalService.getFewUpComingMovies().subscribe(movies=> this.moviesList.next(movies ? movies : this.movies));
      }
      else
        // this._appService.getAllNowPlayingMovies().subscribe(movies => this.moviesList.next(movies));
        this._globalService.getFewNowPlayingMovies().subscribe(movies => this.moviesList.next(movies));
    });

   
   
  }

  onTypeChange(type: string): void {
    if (!(type == this.showText)) {
      const show = type == "Now Playing" ? 'now-playing' : 'up-coming'
      this._router.navigate(['../movies'], { queryParams: { 'show': show } });
    }
  }
  handleLanguageChange(language: string): void {
    if (language && language != this.languageFilter)
      this.languageFilter = language;
  }
  formatRelease(release: any): string {
    if (new Date(release) > new Date())
      return 'Releasing on ' + constant.formatDate(release);
    return 'Now Playing';
  }

}
