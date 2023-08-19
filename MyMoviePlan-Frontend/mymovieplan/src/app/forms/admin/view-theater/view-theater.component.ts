import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Theatre } from 'src/app/Models/Theatre.model';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-view-theater',
  templateUrl: './view-theater.component.html',
  styleUrls: ['./view-theater.component.css']
})
export class ViewTheaterComponent implements OnInit {
  theatre: Theatre[] = [];
  constructor(private theatreService:TheatreService , private _snackBar:MatSnackBar){}
  ngOnInit(): void {
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
  }

  public deleteTheatre(tid:any){

    this.theatreService.deletetheatre(tid).subscribe({
      next:(res)=>{

        this.theatre = this.theatre.filter((data)=>data.tid != tid);

        this._snackBar.open('delete successfully','',{
          duration:3000,
        });

      },
      error:(err)=>{
        this._snackBar.open('server error','',{
          duration:3000,
        });
      }
    });

  }

}
