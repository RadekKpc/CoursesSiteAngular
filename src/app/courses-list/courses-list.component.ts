import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CoursesServiceService} from '../courses-service.service';
import { Course } from '../Interfaces/course';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: Object;
  searchName:string;
  searchSemestr: boolean[];
  minRating:number;
  maxRating:number;
  minEcts:number;
  maxEcts:number;
  maxSem:number;
  minSem:number;

  constructor(private coursesService: CoursesServiceService) {
  }

  getCourses():void{
    this.coursesService.getCourses().subscribe(
      courses => this.courses = courses
    );
  }

  ngOnInit() {
    this.getCourses();
  }

  deleteCourse(key: string){
      this.coursesService.deleteCours(key);
      this.getCourses();
  }

  searchCourses({searchName,minSem,maxSem,minRating,maxRating,minEcts,maxEcts}){
    this.searchName = searchName;
    this.minSem = minSem;
    this.maxSem = maxSem;
    this.minRating = minRating;
    this.maxRating = maxRating;
    this.minEcts = minEcts;
    this.maxEcts = maxEcts;
  }
}
