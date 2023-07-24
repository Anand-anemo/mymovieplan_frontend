import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService , private snack:MatSnackBar){}
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    mobileno:'',
  };
  ngOnInit(): void {
    
   


  }
  register(registerForm: NgForm){
      console.log(this.user)
      if(this.user.username ==''|| this.user.username == null){
        this.snack.open('field should not be empty!!','',{
          duration:3000,
          verticalPosition:'top',
        });
        return;
      }
      this.userService.adduser(this.user).subscribe({
        next: (res)=>{
          console.log(res);
          this.snack.open('Registration done','',{
            duration:3000,
            verticalPosition:'top',
          })
          

        },
        error:(err)=>{console.log("error")
        this.snack.open('User with this name already exists','',{
          duration:3000,
          verticalPosition:'top',
        })
      },
        complete:()=>console.log("done")

      }
        

      );
  } 

}


