import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genres } from 'src/app/Models/Genres.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-add-genres',
  templateUrl: './add-genres.component.html',
  styleUrls: ['./add-genres.component.css']
})
export class AddGenresComponent implements OnInit{
  genre:Genres={
    gid: null,
    genreName: ''
  }
  constructor(private genreService:GenreService
    ,private snackbar:MatSnackBar){}
  ngOnInit(): void {}
  formSubmit(){
    if(this.genre.genreName.trim()=='' || this.genre.genreName==null){
      this.snackbar.open('field is empty','',{
        duration:3000,
      });
      return;
    }
    this.genreService.addGenre(this.genre).subscribe({
      next:(res)=>{
        this.genre.genreName=''
        this.snackbar.open('genre added','',{
          duration:3000,
        });
      },
      error:(err)=>{
        this.snackbar.open('Error!!!','',{
          duration:3000,
        });
      },
      complete:()=>{
        console.log("done")
      }
    });
  }

}
