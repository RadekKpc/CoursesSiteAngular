import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {Observable} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {AngularFireDatabase} from '@angular/fire/database';
import User from './Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,private router: Router,private db: AngularFireDatabase){

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

  SignUpUser(email, password, lastName,name){
  this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      let role = {
        adding: false,
        delete: false
      }
      let user: User ={
      id: result.user.uid,
      lastName: lastName,
      name: name,
      coursesRating: {},
      cousresJoined: {},
      role: role
      }
      this.db.list('users').set(String(result.user.uid),user);
      this.router.navigate(['/list']);
    })
    .catch((error) => {window.alert(error.message);console.log(error.message);})

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