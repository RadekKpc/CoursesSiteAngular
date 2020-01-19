import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../Interfaces/course';
import {CoursesServiceService} from '../courses-service.service';
import { ActivatedRoute } from '@angular/router';
import {ActiveCourseService} from '../active-course.service';
import {Router} from "@angular/router";

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
  user: Object;
  isincourse: boolean;
  course2: Object;
  constructor(private coursesService: CoursesServiceService,private router: Router,private route: ActivatedRoute,private activeCourseService: ActiveCourseService) {
    this.coursesService.getUser().subscribe(users => {this.user = users;  this.isincourse = !this.coursesService.isAlreadyInCurse(this.id);
    this.coursesService.getCourseAlone(this.id).subscribe(course => {
      this.userRating = this.coursesService.getUserRating(this.id);
      this.course = this.coursesService.getCours(this.id);
      // this.course2 = course;
      // console.log(course[7]);
      })});
   }

  onSaveRating(rate: number) :void{
    this.id = this.route.snapshot.paramMap.get('id');
    let key = this.course.id;
    this.coursesService.saveRating(String(key),rate);
    this.userRating = this.coursesService.getUserRating(this.id);
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
      window.alert("Wybierz kurs w liście kursów aby wyswietlić jego szczeguły!");
      this.router.navigate(['/list']);
    }
  }

  tryJoinCourse(){
    if(this.id != 'brak'){
      if(this.canJoin){
        if(this.coursesService.isAlreadyInCurse(this.id)){
          this.message = 'Juz jestes zapisany na ten kurs';
        }
        else{
          if(this.coursesService.joinCourse(this.id)){
            this.message = 'Dołączono pomyślnie :)';

            this.coursesService.getUser().subscribe(users => {this.user = users;  this.isincourse = !this.coursesService.isAlreadyInCurse(this.id); console.log(this.isincourse)});
          }
          else{
            this.message = 'Nie ma już miejsc na kursie :C';
            return;
          }
      }
      }
      }
      else{
        this.message = 'Wybierz kurs!';
        return;
      }
  }


}
