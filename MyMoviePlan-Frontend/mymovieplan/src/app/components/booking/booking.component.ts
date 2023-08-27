import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Booking } from 'src/app/Models/Booking.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { constant } from 'src/app/services/helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  present: boolean = true;

  heading = 'Your booking list';

  bookings!: Booking[];
  allBookings = new BehaviorSubject<Booking[]>(this.bookings);
  allBookings$ = this.allBookings.asObservable();

   auditoriumName$ = new BehaviorSubject<string>('');//
   showName$ = new BehaviorSubject<string>('');
  showTiming$ = new BehaviorSubject<string>('');
   movieName$ = new BehaviorSubject<string>('');
   movieLanguage$ = new BehaviorSubject<string>('');
  dateOfBooking$ = new BehaviorSubject<Date>(new Date());
  movieImage$ = new BehaviorSubject<string>('');
  noOfTickets$ = new BehaviorSubject<number>(0);
  selectedSeats$ = new BehaviorSubject<string[]>([]);
  amount$ = new BehaviorSubject<number>(0);
   
   




  selectedBookingId = 0;
  constructor(private _appService: ApplicationService,
    private _userService: UserService,
    private _globalService: GlobalService){}
  ngOnInit(): void {
    const userId = this._userService.getUser()?.id;
    this._appService.getAllUserBooking(userId!).subscribe(bookings => {
      if (bookings.length < 1) {
        this.heading = 'Booking list is empty';
        this.present = false;
      }
      const all_bookings = bookings.sort((booking1, booking2) => constant.sortByDates(booking1.dateOfBooking, booking2.dateOfBooking));
      console.log(all_bookings);
      this.allBookings.next(all_bookings);
      this.setBooking(all_bookings[0]);
    });
    
  }
  formatTime(time: string): string {
    return constant.formatTimeToAmOrPm(time);
  }

  onBookingChange(bookingId: number): void {
    if (this.selectedBookingId != bookingId) {
      this.allBookings$.pipe(
        map(bookings => {
          const booking = bookings.find(booking => booking.id == bookingId)!;
          console.log(booking);
          this.setBooking(booking);
        })
      );
    }
  }

  setBooking(booking: Booking) {
    this.selectedBookingId = booking?.id!;
    this.amount$.next(booking?.amount!);
    this.dateOfBooking$.next(booking?.dateOfBooking!);
    this.noOfTickets$.next(booking?.totalSeats!);
    this.selectedSeats$.next(booking?.seatNumbers!);
    this._globalService.getTheatre().subscribe(halls => {
      const auditorium = halls.find(hall => hall.tid == booking?.bookingDetails.auditoriumId);
      console.log(auditorium);
      this.auditoriumName$.next(auditorium?.theatreName!);
      const show = auditorium?.shows.find(show => show.showid == booking?.bookingDetails.showId);
      this.showName$.next(show?.name!);
      this.showTiming$.next(show?.startTime!);
    });

    this._globalService.getAllMovies().subscribe(movies => {
      const movie = movies.find(movie => movie.movieid == booking?.bookingDetails.movieId);
      this.movieImage$.next(movie?.imageurl!);
      this.movieLanguage$.next(movie?.language!);
      this.movieName$.next(movie?.movieName!);
    });
  }


}
