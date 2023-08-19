import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  

  constructor(private _httpClient:HttpClient) { }

  public addmovie(movie:any ){

    
    return this._httpClient.post(`${baseUrl}/movies/` , movie )

  }

  public getmovies(){
    return this._httpClient.get(`${baseUrl}/movies/`);
  }

  public assigntheatretomovie(mid:any,tid:any){
    let searchparam=new HttpParams();
    searchparam=searchparam.append('movieid',mid);
    searchparam=searchparam.append('tid',tid);

    // this._httpClient.post(`${baseUrl}/movies/movietheatres/?movieid=`${mid}`&tid=`+tid);
    return this._httpClient.post("http://localhost:8080/movies/movietheatres/",searchparam);

  }

}

