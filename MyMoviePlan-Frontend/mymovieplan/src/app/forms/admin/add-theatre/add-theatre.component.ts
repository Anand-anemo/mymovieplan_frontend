import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Theatre } from 'src/app/Models/Theatre.model';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit{
  theatre:Theatre={
    tid: 0,
    theatreName: '',
    address: '',
    location: '',
    city: '',
    phoneno: '',
    seatCapacity: 0,
    shows: []
  }
 
  constructor(private snackbar:MatSnackBar,private _theatre:TheatreService){}
  ngOnInit(): void {}

  addtheatre(){
    if(this.theatre.theatreName.trim() == '' || this.theatre.theatreName == null){
      this.snackbar.open('field is empty','',{
        duration:3000,
      });
      return;
    }

    this._theatre.addtheatre(this.theatre).subscribe(
      {
        next:(res)=>{
          this.snackbar.open('value added','',{
            duration:3000,
          });
          this.theatre={
            tid: 0,
            theatreName: '',
            address: '',
            location: '',
            city: '',
            phoneno: '',
            seatCapacity:0,
            shows: []
          }
        },
        error:(err)=>{
          this.snackbar.open('error in adding data','',{
            duration:3000,
          });
        }
      }
    );
  }

}
