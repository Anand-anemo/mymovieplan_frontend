import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Movies } from 'src/app/Models/Movie.model';
import { MovieShows } from 'src/app/Models/MovieShows.model';
import { Shows } from 'src/app/Models/Shows.model';
import { TempSelectMembers } from 'src/app/Models/TempSelectMembers.model';
import { Theatre } from 'src/app/Models/Theatre.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { constant } from 'src/app/services/helper';

class SelectMembers implements TempSelectMembers {
  auditoriumId: number = 0;
  auditoriumName: string = '';
  showId: number = 0;
  showName: string = '';
  showTime: string = '';
  movieShowId:number=0;
  bookedSeats: number = 0;
  bookedSeatNumbers: string[] = [];
  date: Date = new Date();
  movieName: string = '';
  movieId = 0;
  movieLanguage: string = '';
  seats: number = 0;

}


@Component({
  selector: 'app-selectmember',
  templateUrl: './selectmember.component.html',
  styleUrls: ['./selectmember.component.css']
})
export class SelectmemberComponent implements OnInit {
  ticketsForm!: FormGroup;

  allAuditoriums$!: Observable<Theatre[]>;

  allShows$!: Observable<Shows[]>;

  startDate$!: Observable<Date>;

  endDate$!: Observable<Date>;

  avaliableSeats$ !: Observable<number[]>;
  movieShowId:any


  // selectedMovieName!: string;

  selectedMovieId!: number;

  selectMembers!: TempSelectMembers;

  // selectedMovieLanguage!: string;

  // movieShowId!: number;

  // selectedShowTiming!: string;

  // selectedAuditoriumId!: number;

  // selectedShowId!: number;

  selectedSeats = 0;

  // bookedSeats!: number;

  // bookedSeatNumber!: string[];
  movieShow:MovieShows[]=[]
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public _data: {
    movieId: number,
    movie: Observable<Movies>
  },
    private _sheet: MatBottomSheet,
    private _fb: FormBuilder,
    private _service: GlobalService,
    private _appService: ApplicationService){}
 
    ngOnInit(): void {

      console.log(this._data.movie);
    console.log(this._data.movieId);

    this.selectMembers = new SelectMembers();

    this.allAuditoriums$ = this._appService.getAuditoriumsByMovieId(this._data.movieId);

    this._data.movie.subscribe(movie => {
      this.selectMembers.movieName = movie?.movieName!;
      this.selectMembers.movieLanguage = movie.language!;
      // this.selectedMovieName = movie.name!;
      // this.selectedMovieLanguage = movie.language!;
      this.selectedMovieId = movie.movieid!;

      //this.selectedMovieId = this._data.movieId;
      //this.selectMembers.movieId = movie.movieid!;
    });

    this.ticketsForm = this._fb.group({
      auditoriumName: new FormControl('', Validators.required),
      showName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      seats: new FormControl('', Validators.required)
    });

    
  }
  resolveArray(seats: number): number[] {
    if (seats > 5)
      return [...Array(6).keys()].filter(num => num > 0);
    else if (seats > 0 && seats < 5)
      return [...Array(seats + 1).keys()].filter(num => num > 0);
    else
      return new Array<number>();
  }

  onAuditoriumSelect(hallId: number, hallName: string): void {

    if (hallName != this.ticketsForm.get('auditoriumName')?.value) {
      this.selectMembers.auditoriumId = hallId;
      this.selectMembers.auditoriumName = hallName;
      this.allShows$ = this._appService.getShowsByMovieId(hallId, this.selectedMovieId);
      this.ticketsForm.get('showName')?.reset;
    }
  }

  onShowSelect(showId: number, showName: string): void {
    if (showName != this.ticketsForm.get('showName')?.value) {
      // this.selectedShowId = showId;
      this.selectMembers.showId = showId;
      this.selectMembers.showName = showName;
      this.allShows$.subscribe(shows => {
        const show = shows.find(show => show.name == showName);
        const movieShow = show?.movieShows?.find(m_show => m_show.movieid == this.selectedMovieId);
        console.log(movieShow);
        this.startDate$ = of((new Date(movieShow?.start!) < new Date()) ? new Date() : movieShow?.start!);
        this.endDate$ = of(movieShow?.end!);
        this.selectMembers.showTime = show?.startTime!;
        
        this.selectMembers.movieShowId = movieShow?.movieshowsid!;
        console.log(this.selectMembers.movieShowId);
        this.selectMembers.movieId = this._data.movieId;
        
      })
      this.ticketsForm.get('date')?.reset;
    }
  }

  onDateSelect(event: any): void {
    const value = event?.target?.value;
   
    // console.log(this.selectMembers.movieShowId);
    // this.movieShowId=this.selectMembers.movieShowId
    // console.log(this.movieShowId);
    
    
    this._appService.getAllBookedSeats(this.selectMembers.movieShowId, value).subscribe(seats => {
      const count = this.resolveArray(100 - seats.count);
      this.avaliableSeats$ = of(count);
      this.selectedSeats = (count.length > 0 ? 1 : 0);
      this.selectMembers.bookedSeatNumbers = seats.seats;
      this.selectMembers.bookedSeats = seats.count;
    });
  }

  onSeatsChange(seat: number): void {
    this.selectedSeats = seat;
  }

  get icon(): string {
    let seats = this.selectedSeats;
    if (seats == 1)
      return 'directions_bike';
    else if (seats == 2)
      return 'two_wheeler';
    else if (seats == 3)
      return 'electric_rickshaw';
    else if (seats == 4)
      return 'time_to_leave';
    else if (seats == 5)
      return 'airport_shuttle';
    return 'error';
  }

  formatTime(time: string): string {
    return constant.formatTimeToAmOrPm(time);
  }

  proceed(): void {
    // const data: TempSelectMembers = this.ticketsForm.value;
    this.selectMembers.date = this.ticketsForm.get('date')?.value;
    this.selectMembers.seats = this.ticketsForm.get('seats')?.value;

    this._sheet.dismiss({ tempSelectMembers: this.selectMembers });
  }


}
