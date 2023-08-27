import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Movies } from 'src/app/Models/Movie.model';
import { MovieShows } from 'src/app/Models/MovieShows.model';
import { ShowsformComponent } from '../showsform/showsform.component';
import { constant } from 'src/app/services/helper';

@Component({
  selector: 'app-movietoshows',
  templateUrl: './movietoshows.component.html',
  styleUrls: ['./movietoshows.component.css']
})
export class MovietoshowsComponent implements OnInit {
  filteredMovies!: Observable<Movies[]>;

  startDate!: Date;

  endDate!: Date;

  movieShows!: MovieShows[];

  tempEndDate!: Date;

  movies!: Movies[];

  movieShowForm!: FormGroup;
  movieId = new FormControl('', [
    Validators.required]);

  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });
  constructor(private _fb: FormBuilder,
    public _dialog: MatDialogRef<ShowsformComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { shows: MovieShows[], movies: Movies[]}){
      this._dialog.disableClose = true;

    this.filteredMovies = this.movieId.valueChanges.pipe(
      startWith(''),
      map((movie:any) => (movie ? this._filterMovies(movie) : this.movies.slice()))
    );
    }
  ngOnInit(): void {

    this.movies = this._data.movies;
    this.movieShows = this._data.shows;

    this.tempEndDate = this.movieShows?.length > 0 ? constant.getTomarrow(constant.findEndDate(this.movieShows.map(m_show => m_show.end))) : new Date();

    this.movieShowForm = this._fb.group({
      movieId: this.movieId,
      range: this.range,
      gold: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
      silver: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
      general: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
    });
    
  }

  private _filterMovies(value: number): Movies[] {
    return this.movies.filter((movie) => movie.movieid == value);
  }

  onMovieChange(event: any): void {
    const releaseDate: Date = this.movies?.find(movie => movie.movieid == event.value)?.release!;

    this.startDate = (new Date(this.tempEndDate) > new Date(releaseDate)) ? this.tempEndDate : releaseDate;

    if (!this.startDate)
      this.startDate = new Date();
  }

  onCancel(): void {
    this._dialog.close();
  }
  onSubmit(): void {
    const values = this.movieShowForm.value;
    const data: MovieShows = {
      movieid: values.movieId,
      start: values.range.start,
      end: values.range.end,
      price: {
        gold: values.gold,
        silver: values.silver,
        general: values.general,
      },
    };
    this._dialog.close({ movieShow: data });
  }
}
