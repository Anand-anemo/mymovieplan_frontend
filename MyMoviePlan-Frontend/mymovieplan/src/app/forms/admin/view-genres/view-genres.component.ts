import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genres } from 'src/app/Models/Genres.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-view-genres',
  templateUrl: './view-genres.component.html',
  styleUrls: ['./view-genres.component.css']
})
export class ViewGenresComponent implements OnInit{

  genres:Genres[]=[];
  constructor(private genreService:GenreService ){}
  ngOnInit(): void {
    this.genreService.getallgenres().subscribe(
      {
        next:(res:Genres[])=>{
          console.log(res);
          this.genres=res;
          
        },
        error:(err)=>{
          console.log(err);

        },
        complete:()=>console.log('done')
      }
    );
  }

}
