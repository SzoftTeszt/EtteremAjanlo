import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url=" https://us-central1-etteremajanlo-22864.cloudfunctions.net/api/"
  defaultClaims={superAdmin:false, admin:false, critic:false}
  private user:any

  constructor(
    private afAuth: AngularFireAuth, 
    private router:Router,
    
    private http:HttpClient) 
    {    
      this.getUser();
      //teszt
    }

    getHeaders(){
      if (this.user) return new HttpHeaders().set('Authorization', this.user.token)
      return new HttpHeaders()
    }

  getUser(){
    this.getLoggedUser().subscribe(
      (u)=>{
        console.log("Felhasználó", u)
        this.user=u
        u?.getIdToken().then(
          (token)=>{
            this.user.token=token
            this.getUserClaims(this.user.uid).subscribe({
              next:(claims)=> 
              {   
                this.user.claims=claims             
                console.log("Claims", this.user)
                
              },
              error:(error)=>console.log(error)
            }
            )            
          }
    )})}


  isSuperAdmin(){
    return this.user.claims.superAdmin
  }  

  getUserClaims(uid:any){
    let headers=this.getHeaders()
    return this.http.get(this.url+'users/'+uid+'/claims',{headers})
  }      
              
  getUsers(){
    // if (this.user){
    let headers=this.getHeaders();
    return this.http.get(this.url+'users', {headers})  
}

  setClaims(uid:any,claims:any, token?:any){
    console.log("SetClaims",this.user)
    let body={uid,claims}
    let headers

    if (!token) headers=this.getHeaders()
    else headers= new HttpHeaders().set('Authorization', token)

    this.http.post(this.url+'setCustomClaims',body,{headers}).subscribe(
      ()=>"Claimsok beállítása sikeres!!!"
    )
  }

  setDefaultClaims(uid:any, token:any){
    this.setClaims(uid,this.defaultClaims, token)
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
