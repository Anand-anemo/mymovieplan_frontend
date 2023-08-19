import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theatre } from '../Models/Theatre.model';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private httpClient:HttpClient) { }
//get all the theatre service
  public getTheatre(){
    return this.httpClient.get<Theatre[]>(`${baseUrl}/theatre/`);
  }
//add theatre service
  public addtheatre(theatre: any){
    return this.httpClient.post(`${baseUrl}/theatre/`,theatre)

  }

  //delete theatre service

  public deletetheatre(tid:any){
    return this.httpClient.delete(`${baseUrl}/theatre/${tid}`);
  }

  public getTheatreById(tid:any){
    return this.httpClient.get(`${baseUrl}/theatre/${tid}`);
  }


}
