import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { User } from '../Models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //Register user
  public adduser(user:any){
    return this.http.post(`${baseUrl}/user/`,user);
  }

  getUser():User | null {

   // const user_email = localStorage.getItem('email');
    //const user_name = localStorage.getItem('username');
    const user_id = localStorage.getItem('id');

    if (user_id) {
      const user: User = {
       
        id: user_id
      }
      return user;
    }
    else
      return null;

  }
}
