import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  password:any;
  userEmail:any;


  constructor(private auth:AuthService, 
    private router:Router){

  }

  googleAuth(){
    this.auth.googleAuth().then(
      ()=>{
        console.log("Sikeres Google belépés!")
        this.router.navigate(['/ajanlo'])
      }      
      )
      .catch((e)=>console.log("Hiba:",e))
  }

  signIn(){
    this.auth.signIn(this.userEmail, this.password)
    .then(()=>console.log("Sikeres belépés"))
    .catch((e)=>console.log("Hiba a belépésnél",e))
  }

}
