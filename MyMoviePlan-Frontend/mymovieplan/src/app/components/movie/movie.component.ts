import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movies } from 'src/app/Models/Movie.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { SelectmemberComponent } from '../selectmember/selectmember.component';
import { constant } from 'src/app/services/helper';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  selectedMovie$!: Observable<Movies>;
  movieid!: number;
  constructor(private _mbs: MatBottomSheet,
    private _globalService: GlobalService,
    private _userService: UserService,
    private _loginService:LoginService
    ,
    private _router: Router,
    private _activeRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.movieid = this._activeRoute.snapshot.params['movieid'];

    this._globalService.getAllMovies()
      .subscribe(movies => {
        const movie = movies.find(movie => movie.movieid == this.movieid)!
        this.selectedMovie$ = of(movie);
        //this.casts.next(movie?.casts?.filter(cast => cast.isCast == 'yes')!);
        //this.crews.next(movie?.crews?.filter(cast => cast.isCast == 'no')!);
      });
   
  }

  openBottomSheet(): void {
    if (!this._loginService.isLoggedIn()) {
      this._router.navigate(['/login']);
      return;
    }
    else {
      let sheet = this._mbs.open(SelectmemberComponent, { data: { movieId: this.movieid, movie: this.selectedMovie$ } });
      sheet.afterDismissed().subscribe(data => {
        if (data?.tempSelectMembers) {
          this._globalService.setTempSelectMembers(data.tempSelectMembers);
          this._router.navigate(['/select-seats']);
        }
      });
    }
  }
  formatRelease(release: any): string {
    if (new Date(release) > new Date())
      return 'Releasing on ' + constant.formatDate(release);
    return 'Now Playing';
  }


}
