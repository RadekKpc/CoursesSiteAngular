import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Course } from '../Interfaces/course';
import {ActiveCourseService} from '../active-course.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']

})
export class CourseComponent implements OnInit {

  @Input() cours: Course;
  @Output() coursIsDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private activeCourseService: ActiveCourseService) {}
  ngOnInit() {
  }
  onDelete(key: string): void{
    if(this.activeCourseService.getActiveCourse().toString() ==  this.cours.id){this.activeCourseService.setActiveCourse('brak');}
    this.coursIsDeleted.emit(key);

  }


}
