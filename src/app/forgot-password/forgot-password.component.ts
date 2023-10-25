import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userEmail:any

  constructor (private auth:AuthService,
    private router:Router){}


  validUser(){
    if (this.userEmail) return false
    else return true
  }

  forgotPassword(){
    this.auth.forgotPassword(this.userEmail).then(
      ()=>this.router.navigate(['/signin'])
    )
  }
}
