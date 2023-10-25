import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://us-central1-etteremajanlo-22864.cloudfunctions.net/api/"
  constructor(
    private afAuth: AngularFireAuth, 
    private router:Router,
    private http:HttpClient) { }

  getUsers(){
    this.getLoggedUser().subscribe(
      (u)=>{
        u?.getIdToken().then(
          (token)=>{
            let headers = 
              new HttpHeaders().set('Authorization', token)
              this.http.get(this.url+'users', {headers}).subscribe(
                (users)=>console.log("Felhasználók:", users)
              )
          }
        )        
      }
    )
  }


  signUp(email:any,password:any){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
  }
  signIn(email:any,password:any){
    return this.afAuth.signInWithEmailAndPassword(email,password)
  }

  sendVerificationEmail(){
    this.afAuth.currentUser
    .then(  
      (user)=>{ 
        console.log("Regelt user:",user)
        user?.sendEmailVerification()
      }     
      )
      .then(()=>this.router.navigate(['/verifyemail']))
    .catch((e)=>{alert(e)})
  }

  googleAuth(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
    return this.afAuth.signInWithRedirect(new GoogleAuthProvider())
  }

  getLoggedUser(){
    return this.afAuth.authState
  }

  signOut(){
    return this.afAuth.signOut()
  }

  forgotPassword(email:any){
    return this.afAuth.sendPasswordResetEmail(email)
  }

}
