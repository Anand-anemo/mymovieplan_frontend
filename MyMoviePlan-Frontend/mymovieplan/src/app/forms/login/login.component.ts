import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''

  }

  constructor(private snack:MatSnackBar,
    private login:LoginService , private router:Router ){}

  ngOnInit(): void {
    
  }
  formSubmit(){
    if(this.loginData.username.trim()=='' || this.loginData.username==null){

      this.snack.open('Username is required!!','',{
        duration:3000,
        verticalPosition:'top',
      });
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){

      this.snack.open('Username is required!!','',{
        duration:3000,
        verticalPosition:'top',
      });
      return;
    }

    //request to server to generate token

    this.login.generateToken(this.loginData).subscribe(
      {
        next:(res:any)=>{
          console.log(res)
          this.snack.open('login successfully done','',{
            duration:3000
          });
          //login...
          this.login.loginUser(res.token);
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(user);
              if(this.login.getUserRole() == 'ADMIN'){
                //  window.location.href = '/admin-dashboard'
                this.router.navigate(['admin-dashboard'])
                this.login.loginStatusSubject.next(true);
              }else if(this.login.getUserRole() == 'NORMAL'){
                //  window.location.href='/user-dashboard'
                this.router.navigate(['home'])
                this.login.loginStatusSubject.next(true);
              }else{
                this.login.logout();
              }
            }
            
          );

        },
        error:(err)=>{console.log(err)
          this.snack.open('input is not valid','',{
            duration:3000
          });
        },
          complete:()=>console.log("done")
      }
    );



  }
  
  

}
