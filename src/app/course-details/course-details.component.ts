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
  canJoin: boolean = false;
  message: String = '';
  rate: number;
  userRating;
  constructor(private coursesService: CoursesServiceService,private route: ActivatedRoute,private activeCourseService: ActiveCourseService) {

   }

  onSaveRating(rate: number) :void{
    this.id = this.route.snapshot.paramMap.get('id');
    let key = this.course.id;
    this.coursesService.saveRating(String(key),rate);
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initialiseState();
  });
}

initialiseState(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.message= "";
    if(this.id != 'brak'){
    this.course = this.coursesService.getCours(this.id);
    this.activeCourseService.setActiveCourse(this.id);
    this.canJoin = this.course.maxStudents >= this.course.occupiedPlaces;
    this.userRating = this.coursesService.getUserRating(this.id);
    }
    else{
      this.course = null;
    }
    console.log(this.userRating);
  }

  tryJoinCourse(){
    if(this.id != 'brak'){
      if(this.canJoin){
        if(this.coursesService.joinCourse(this.id)){
          this.message = 'Dołączono pomyślnie :)';
          return;
        }
        else{
          this.message = 'Nie ma już miejsc na kursie :C';
          return;
        }
      }
      }
      else{
        this.message = 'Wybierz kurs!';
        return;
      }
  }


}
