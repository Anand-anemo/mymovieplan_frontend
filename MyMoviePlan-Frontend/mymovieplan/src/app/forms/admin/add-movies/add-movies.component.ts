import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genres } from 'src/app/Models/Genres.model';
import { Movies } from 'src/app/Models/Movie.model';
import { Theatre } from 'src/app/Models/Theatre.model';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';
import { TheatreService } from 'src/app/services/theatre.service';


@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.css']
})
export class AddMoviesComponent implements OnInit{
  //todayDate=new Date();
  genres:Genres[]= [];
  theatre: Theatre[] = [];
 // selectedTheatreid: number[] = [];
  
  
  movies: Movies={
    movieid: 0,
    movieName: '',
    language: '',
    summary: '',
    release: new Date,

    genres: {
      gid: 0
    },
    active: false,
    imageurl: '',
    movieTheatre: []
  }
  tid: any
  
   value=false;
  constructor(private genreService:GenreService , 
              private theatreService:TheatreService,
              private _snackbar:MatSnackBar,
              private _movieService:MovieService){

  }
  ngOnInit(): void {
    this.genreService.getallgenres().subscribe({
      next:(res:Genres[])=>{
        this.genres=res;
      },
      error:(err)=>{
        console.log("error in  getting genres")
      }
    }

    );

    this.theatreService.getTheatre().subscribe(
      {
        next:(res:Theatre[])=>{
          console.log(res);
          this.theatre=res;
          
        },
        error:(err: any)=>{
          console.log(err);

        },
        complete:()=>console.log('done')
      }
    );

//this.selectedTheatreid=new Array<number>();
   // this.moviettr=new Array<any>();
  }
 


  // getTheatreId(e:any , id:number){

  //   if(e.target.checked){
  //     console.log(id);

  //     this.selectedTheatreid.push(id);

  //   }
  //   else{
  //     console.log(id + 'unchecked');
  //     this.selectedTheatreid=this.selectedTheatreid.filter(m=>m!=id);

  //   }
  //   console.log(this.selectedTheatreid);
  //   for(let i=0;i<=this.selectedTheatreid.length;i++)
  //   {
  //     this.theatreService.getTheatreById(this.selectedTheatreid[i]).subscribe(
  //       {
  //         next:(res:any)=>{
  //           this.moviettr.push(res);
  //           for(let i=0 ; i<=this.moviettr.length;i++){
  //             this.movies.movieTheatre = res;

  //           }
  //           console.log(this.moviettr);
           
  //           console.log(res);
  //         },
  //         error:(err)=>{
  //           console.log(err);
  //         }
         
  //       }
       
  //     );
  //     console.log(this.selectedTheatreid[i]);
  //   }

  // }

  addmovie() {

    if (this.movies.movieName.trim() == '' || this.movies.movieName == null ) {
      this._snackbar.open('field is empty', '', {
        duration: 3000,
      });
      return;
    }

    this._movieService.addmovie(this.movies).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log("error");
      }
      
    });


  }

  // getmovieid(id:number){
  //   console.log(id);
  // }

  
  

  
  

}
