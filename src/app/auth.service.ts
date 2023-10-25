import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router) { }

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
