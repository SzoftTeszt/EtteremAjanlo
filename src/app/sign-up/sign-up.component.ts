import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userEmail:any=""
  pass1:any=""
  pass2:any=""
  constructor(private auth:AuthService,
    private router:Router){

  }

  googleAuth(){
    this.auth.googleAuth().then(()=>this.router.navigate(['/ajanlo']))
  }

  signUp(){
    this.auth.signUp(this.userEmail, this.pass1)
    .then(()=>
    {
    console.log("Sikeres regiszráció!")
    this.auth.sendVerificationEmail()
    }
    )
    .catch((e)=>console.log("Reg Hiba:",e))
  }
  
  validUser(){
    console.log(this.userEmail?.length);
    if (this.userEmail?.length==0 || this.pass1?.length==0) return true;
    if (this.pass1 != this.pass2) return true;
    return false;
  }

}
