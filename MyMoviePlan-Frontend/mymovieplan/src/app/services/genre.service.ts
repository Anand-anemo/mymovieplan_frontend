import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Genres } from '../Models/Genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private _http:HttpClient){ }
//get all genres
  public getallgenres(){
    return this._http.get<Genres[]>(`${baseUrl}/genre/`);
  }
//ADD NEW GENRE
public addGenre(genre: any){
  return this._http.post(`${baseUrl}/genre/`,genre);
}
}
