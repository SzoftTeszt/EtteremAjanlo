import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:any
  
  constructor(private auth:AuthService){  

    this.auth.getUsers().subscribe(
      (users)=> this.users=users
    )
  }
  save(user:any){
    this.auth.setClaims(user.uid,user.claims)
  }

  isSuperAdmin(){
    console.log("superAdmin ", this.auth.isSuperAdmin())
    return this.auth.isSuperAdmin()
  }
}
