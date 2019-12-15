import { Injectable } from '@angular/core';
import {Course} from './Interfaces/course';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {

  private courses: Object;
  private maxId :number;
  constructor(private db: AngularFireDatabase,private authService: AuthService) {
    this.getMaxId().subscribe(id => this.maxId = id);
    this.getCourses().subscribe(courses => this.courses=courses);
   }

  getCourses(): Observable<any>{
    return this.db.list('kursy').valueChanges();
  }

  addCours(course: Course){
    console.log(this.maxId[0]);
    let c = 1;
    while(Object.keys(this.courses).includes(String(this.maxId[0] + c)))c++;
    course.id = this.maxId[0]+c;
    this.db.list('kursy').set(String((this.maxId[0] + c)),course);
    this.db.list('maxId').set('maxId',this.maxId[0] + c);
  }

  getMaxId(): Observable<any>{
    return this.db.list('maxId').valueChanges();
  }

  getCours(key: String){
    return Object.values(this.courses).filter(course => {return course.id == key})[0];
  }

  deleteCours(key: String){
    this.db.list('kursy/' + key).remove();
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
    let rate = Object.entries(this.getCours(id).rating.usersRating).filter(ar => {return (ar[0] == uid)});
    if(rate.length == 0)return 0;
    if(rate.length != 0)return rate[0][1] ? rate[0][1]  : 0;
  }
}
