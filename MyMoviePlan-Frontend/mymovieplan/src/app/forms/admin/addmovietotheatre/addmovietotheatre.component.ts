import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Movies } from 'src/app/Models/Movie.model';
import { Theatre } from 'src/app/Models/Theatre.model';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { constant } from 'src/app/services/helper';
import { MovieService } from 'src/app/services/movie.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-addmovietotheatre',
  templateUrl: './addmovietotheatre.component.html',
  styleUrls: ['./addmovietotheatre.component.css']
})
export class AddmovietotheatreComponent implements OnInit{

  auditoriumForm!: FormGroup;
  showNames=constant.SHOW_NAMES;
  allTheatresNames!: string[];
  constructor(private _fb: FormBuilder,
    private _theatreService:TheatreService,
    private _globalService:GlobalService,
    private _router: Router
    ){

  }

  ngOnInit(): void {

    this._globalService.getTheatresNames()
    .subscribe(halls => this.allTheatresNames = halls);

    this.auditoriumForm = this._fb.group({
      theatreName: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl(''),
      location: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phoneno: new FormControl('', Validators.required),
      seatCapacity: new FormControl(100, Validators.required),
     
      shows: new FormArray([])
    })


   
  }

  get shows(): FormArray {
    return this.auditoriumForm.get('shows') as FormArray;
  }

  addShow(): void {
    // if (this.shows.status == 'INVALID') {
    //   this._alertService.defaultAlert('Please complete the above fields');
    //   return;
    // }

    this.shows.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required])
    }));
  }

  removeShow(index: number): void {
    if (confirm(`Do you want to remove the show: ${index + 1}`))
      this.shows.removeAt(index);
  }

  onSubmit(): void {
    this._theatreService.addtheatre(this.auditoriumForm.value)
      .subscribe(
        (res:any) => {
          console.log(res)
           this._globalService.addtheatre(res);
          this._router.navigate(['/admin-dashboard/manage'], { queryParams: { 'auditorium-added': true } });
        },
        // err => this._alertService.postionAlert(err.error.message, 'danger-alert')
      );
  }

}

 

