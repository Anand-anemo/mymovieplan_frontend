import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TempScreen } from 'src/app/Models/TempScreen.model';
import { TempSelectMembers } from 'src/app/Models/TempSelectMembers.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { constant } from 'src/app/services/helper';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit{

  tempSeatColumns: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
  ];

  tempSeatRows = [...Array(11).keys()].filter(num => num > 0);

  goldPrice$ = new BehaviorSubject<number>(500);

  silverPrice$ = new BehaviorSubject<number>(300);

  generalPrice$ = new BehaviorSubject<number>(250);

  auditoriumName$ = new BehaviorSubject<string>('');

  // selectedDate$ = new BehaviorSubject<Date>(new Date());

  // showTiming$ = new BehaviorSubject<string>('');

  // selectedMovieName$ = new BehaviorSubject<string>('');

  // selectedMovieLanguage$ = new BehaviorSubject<string>('');

  seatsToBeSelected!: number;

  // alreadySelectedSeats: string[] = [];

  avalibleSeats!: number;

  nowSelectedSeats: Set<string> = new Set();

  totalAmount: number = 0;

  selectMembers!: TempSelectMembers;

  gold = 0;
  silver = 0;
  general = 0;

  constructor(private _globalService: GlobalService,
    private _router: Router,
    private _appService: ApplicationService){}

  ngOnInit(): void {

    this.selectMembers = this._globalService.getTempSelectMembers();

    if (!this.selectMembers)
      this._router.navigate(['/home'], { queryParams: { 'booking': 'false' } });

      this.seatsToBeSelected = this.selectMembers.seats;

      this._appService.getMovieShow(this.selectMembers.movieShowId).subscribe(m_show => {
        this.goldPrice$.next(m_show.price?.gold!);
        this.silverPrice$.next(m_show.price?.silver!);
        this.generalPrice$.next(m_show.price?.general!);
      })


    
  }

  addSeat(event: any): boolean {
    const value: string = event.target.value;
    if (this.selectMembers.bookedSeatNumbers.indexOf(value) >= 0)
      return false;
    const seats = this.nowSelectedSeats;
    if (seats.has(value) && seats.delete(value)) {
      if (value.startsWith('J') || value.startsWith('I') || value.startsWith('H'))
        this.totalAmount -= this.goldPrice$.value;
      else if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C'))
        this.totalAmount -= this.generalPrice$.value;
      else
        this.totalAmount -= this.silverPrice$.value;
      this.seatsToBeSelected++;
      return false;
    }
    else {
      if (this.seatsToBeSelected == 0)
        return false;
      seats.add(value);
      if (value.startsWith('J') || value.startsWith('I') || value.startsWith('H'))
        this.totalAmount += 500
        //this.goldPrice$.value;
      else if (value.startsWith('A') || value.startsWith('B') || value.startsWith('C'))
        this.totalAmount += 250;
        //this.generalPrice$.value;
      else
        this.totalAmount += 300;
       // this.silverPrice$.value;
      this.seatsToBeSelected--;
      return true;
    }
  }

  isAdded(value: string): boolean {
    return this.nowSelectedSeats.has(value) ? true : false;
  }

  isSeatAlreadySelected(value: string): boolean {
    return this.selectMembers.bookedSeatNumbers.indexOf(value) >= 0 ? true : false;
  }

  getSelectedSeats(): string {
    return [...this.nowSelectedSeats].join(', ');
  }

  formatTime(time: string): string {
    return constant.formatTimeToAmOrPm(time);
  }

  onProceed(): void {

    const tempScreen: TempScreen = {
      amount: this.totalAmount,
      selectedSeatNumbers: [...this.nowSelectedSeats],
      selectedSeats: this.selectMembers.seats,
    }
    this._globalService.setTempScreen(tempScreen);
    this._router.navigate(['./payment']);
  }


}
