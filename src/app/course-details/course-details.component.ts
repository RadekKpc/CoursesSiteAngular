import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../Interfaces/course';
import {CoursesServiceService} from '../courses-service.service';
import { ActivatedRoute } from '@angular/router';
import {ActiveCourseService} from '../active-course.service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course;
  id: any;
  constructor(private coursesService: CoursesServiceService,private route: ActivatedRoute,private activeCourseService: ActiveCourseService) {

   }

  onSaveRating(rate: number) :void{
    let key = this.course.id;
    this.coursesService.saveRating(key,rate);
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initialiseState();
  });
}

initialiseState(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != 'brak'){
    this.course = this.coursesService.getCourses()[this.id];
    this.activeCourseService.setActiveCourse(this.id);
    }
    else{
      this.course = null;
    }
  }


}
