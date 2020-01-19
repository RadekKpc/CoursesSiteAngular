import { Injectable } from '@angular/core';
import {Course} from './Interfaces/course';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";
import { noUndefined } from '@angular/compiler/src/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {

  private courses: Object;
  private maxId :number;
  private users: Object;
  private canD: boolean;
  constructor(private router: Router,private db: AngularFireDatabase,private authService: AuthService) {
    this.getMaxId().subscribe(id => this.maxId = id);
    this.getCourses().subscribe(courses => this.courses=courses);
    this.getUsers().subscribe(users => this.users = users);
    // this.getUser().subscribe(c => this.canD = c.role)
   }

  getCourses(): Observable<any>{
    return this.db.list('kursy').valueChanges();
  }
  getUsers(): Observable<any>{
    return this.db.list('users').valueChanges();
  }
  getUser(): Observable<any>{
    return this.db.list('users/' + this.authService.getCurrentuser().uid).valueChanges();
  }
  getCourseAlone(id): Observable<any>{
    return this.db.list('kursy/' + id).valueChanges();
  }

  addCours(course: Course){
    if(this.canAdd()){
    console.log(this.maxId[0]);
    let c = 1;
    while(Object.keys(this.courses).includes(String(this.maxId[0] + c)))c++;
    course.id = this.maxId[0]+c;
    this.db.list('kursy').set(String((this.maxId[0] + c)),course);
    this.db.list('maxId').set('maxId',this.maxId[0] + c);
    this.router.navigate(['list']);
    }
  }

  getMaxId(): Observable<any>{
    return this.db.list('maxId').valueChanges();
  }

  getCours(key: String){
    return Object.values(this.courses).filter(course => {return course.id == key})[0];
  }

  getCanDelete(){
    return Object.values(this.canD).filter(course => {return course.id == 'delete'})[0];
  }
  getCanAdd(){
    return Object.values(this.canD).filter(course => {return course.id == 'adding'})[0];
  }

  deleteCours(key: String){
    if(this.canDelete()){
      this.db.list('kursy/' + key).remove();
    }
  }

  joinCourse(id){
    if(this.getCours(id).occupiedPlaces < this.getCours(id).maxStudents)
    {
      if(this.authService.isLoggedIn()){
    this.db.list('kursy/' + id).set('occupiedPlaces',this.getCours(id).occupiedPlaces + 1);
    this.db.list('kursy/' + id + '/users').set(this.authService.getCurrentuser().uid,true);
      }else{
        return false;
      }
    return true;
   }
    return false;
  }
  isAlreadyInCurse(id){

    if(this.authService.isLoggedIn()){
      if(Object.keys(this.getCours(id)).filter(k => {return k == "users"}).length == 0){ return false};
      if(Object.keys(this.getCours(id).users).filter(k => {return k == this.authService.getCurrentuser().uid}).length == 0)return false;
      else{
        return this.getCours(id).users[this.authService.getCurrentuser().uid];
      }
      }else{
        return false;
      }
  }
  saveRating(id:String,rate:number){
    let course = this.getCours(id);
    let uid = this.authService.getCurrentuser().uid;
    if((Object.entries(this.getCours(id).users).filter(ar => {return (ar[0] == uid && ar[1])}).length) == 1)
    {
      let oldRate = this.getUserRating(id);
      if(oldRate == 0){
    this.db.list('kursy/'+ id +'/rating/usersRating').set(this.authService.getCurrentuser().uid,rate);
    this.db.list('kursy/'+ id +'/rating').set('allRatingCounter',course.rating.allRatingCounter + 1);
    this.db.list('kursy/'+ id +'/rating').set('sumRating',course.rating.sumRating + rate);
      }
    else{
    this.db.list('kursy/'+ id +'/rating/usersRating').set(this.authService.getCurrentuser().uid,rate);
    this.db.list('kursy/'+ id +'/rating').set('sumRating',course.rating.sumRating + rate - oldRate);
    }
    return true;
   }
    return false;
  }
  getUserRating(id):any{
    let uid = this.authService.getCurrentuser().uid;
    let rate = [];
    if(Object.keys(this.getCours(id).rating).filter(k => {return k == "usersRating"}).length == 0){
      rate = [];
     }else{
      rate = Object.entries(this.getCours(id).rating.usersRating).filter(ar => {return (ar[0] == uid)});
     }
    //  console.log(uid);
    if(rate.length == 0)return 0;
    if(rate.length != 0)return rate[0][1] ? rate[0][1]  : 0;
  }

  canDelete(){
    let uid = this.authService.getCurrentuser().uid;
    let user = Object.values(this.users).filter(ar => {return (ar.id == uid && ar.role.delete)});
    return user.length == 0 ? false : true;
  }
  canAdd(){
    let uid = this.authService.getCurrentuser().uid;
    let user = Object.values(this.users).filter(ar => {return (ar.id == uid && ar.role.adding)});
    return user.length == 0 ? false : true;
  }
}
