import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ajanlasok',
  templateUrl: './ajanlasok.component.html',
  styleUrls: ['./ajanlasok.component.css']
})
export class AjanlasokComponent {
  user:any
  newKritika:any
  kritikak:any;

  constructor(private base:BaseService, private auth:AuthService){
    this.base.get().snapshotChanges().pipe(
      map( (valt:any)=>valt.map((c:any)=>({key:c.payload.key,...c.payload.val()}) )

    )).subscribe(
      (a)=>this.kritikak=a
    )

    this.auth.getLoggedUser().subscribe(
      {
        next: (u)=>{
          console.log("User:",u)
          this.user=u
        },
        error: (e)=>console.log("Hibás belépés: ",e)
      }
    )
  }

  ment(){
    let body:any={}
    body.etterem="KFC"
    body.szerzo=this.user.email
    body.velemeny=this.newKritika
    this.base.createNew(body).then(
      ()=>this.newKritika=""
    )
  }

}
