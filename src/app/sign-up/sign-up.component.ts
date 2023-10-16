import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private auth:AuthService,
    private router:Router){

  }

  googleAuth(){
    this.auth.googleAuth().then(()=>this.router.navigate(['/ajanlo']))
  }

}
