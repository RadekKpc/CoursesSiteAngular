import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {Observable} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,private router: Router){

    this.userData = afAuth.authState;
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }

  SignInUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) =>{
      localStorage.setItem('user', JSON.stringify(result));
      this.router.navigate(['/list']);

    })
    .catch((error) => { console.log(error.message); window.alert(error.message); })
  }

  SignUpUser(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {})
    .catch((error) => {window.alert(error.message)})
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  getCurrentuser(){
    this.userData =  this.afAuth.authState;
    return this.afAuth.auth.currentUser;
  }
  getUser(){
    this.userData =  this.afAuth.authState;
    return this.userData;
  }
  isLoggedIn():boolean
  {
    return this.getCurrentuser() !== null;
  }
}