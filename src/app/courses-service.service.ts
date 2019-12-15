import { Injectable } from '@angular/core';
import {Course} from './Interfaces/course';
import {coursesMock} from './mockData/mockCourse';
import {DataBaseService} from './data-base.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { relative } from 'path';

@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {

  private courses: Object;
  private maxId :number;
  constructor(private db: AngularFireDatabase) {
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
    //upadtemaxID
  }

  getMaxId(): Observable<any>{
    return this.db.list('maxId').valueChanges();
  }
  // constructor(private db: DataBaseService) {
  //   this.courses = coursesMock;
  // }

  // addCours(cours: Course){
  //   this.courses[cours.id]= cours;
  // }

  // getCourses(){
  //  return this.db.getCourses();
  // }

  getCours(key: string){
    return this.courses[key];
  }

  deleteCours(key: string){
    this.db.list('kursy/' + key).remove();
  }
  saveRating(key: string,rating: number){
    if(this.courses[key].rating.userRating == 0)this.courses[key].rating.allRatingCounter = this.courses[key].rating.allRatingCounter+1;
    this.courses[key].rating.sumRating = this.courses[key].rating.sumRating + rating - this.courses[key].rating.userRating;
    this.courses[key].rating.userRating = rating;

  }
}
