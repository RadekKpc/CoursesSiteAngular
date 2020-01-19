import { Injectable } from '@angular/core';
import {CoursesServiceService } from './courses-service.service'
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActiveCourseService {

  private activeCourse:number = null;

  constructor(private courses: CoursesServiceService) { }

  setActiveCourse(id:any){
    this.activeCourse=id;
  }

  getActiveCourse(){
    if(this.activeCourse == null)return 'brak';
    return this.activeCourse;
  }
}
