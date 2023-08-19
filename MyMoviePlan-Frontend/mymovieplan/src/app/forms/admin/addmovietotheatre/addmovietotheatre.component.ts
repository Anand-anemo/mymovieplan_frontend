import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movies } from 'src/app/Models/Movie.model';
import { Theatre } from 'src/app/Models/Theatre.model';
import { MovieService } from 'src/app/services/movie.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-addmovietotheatre',
  templateUrl: './addmovietotheatre.component.html',
  styleUrls: ['./addmovietotheatre.component.css']
})
export class AddmovietotheatreComponent implements OnInit{

  movies:Movies[]=[];
  theatre:Theatre[]=[];
  selectedTheatreid: number[] = [];
  mid:number=0;
  constructor(private _movieService:MovieService,
    private _theatreService:TheatreService,
    private _snackbar:MatSnackBar){

  }

  ngOnInit(): void {

    this._movieService.getmovies().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.movies=res;

      },
      error:(err)=>
      {
        console.log("error in getting movies");
      }
    });

    this._theatreService.getTheatre().subscribe({
      next:(res)=>{
        console.log(res);
        this.theatre=res
      },
      error:(err)=>{
        console.log("error in getting movies");
      }
    });
    
    this.selectedTheatreid=new Array<number>();
  }

  getTheatreId(e:any , id:number){

      if(e.target.checked){
        console.log(id);
  
        this.selectedTheatreid.push(id);
  
      }
      else{
        console.log(id + 'unchecked');
        this.selectedTheatreid=this.selectedTheatreid.filter(m=>m!=id);
  
      }
      console.log(this.selectedTheatreid);
  }
addmovietotheatre(mid:number){

    for (let i = 0; i <= this.selectedTheatreid.length; i++) {

      this._movieService.assigntheatretomovie(mid, this.selectedTheatreid[i]).subscribe({

        next: (res) => {
          this._snackbar.open('Data added ', '', {
            duration: 3000,
          });

        },
        error: (err) => {
          this._snackbar.open('error', '', {
            duration: 3000,
          });
        }
      });
    }

  
}
  

}
