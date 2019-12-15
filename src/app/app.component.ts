import { Component,OnInit } from '@angular/core';
import { Course } from './Interfaces/course';
import {ActiveCourseService} from './active-course.service';
import {Router} from "@angular/router";
import {AuthService} from './auth.service';
import {AngularFireAuth} from  '@angular/fire/auth';
import {AuthGuard,NotAuthGuard} from './guard/auth.guard';
import {Observable,Observer} from 'rxjs';
import { CoursesServiceService } from './courses-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KopecProject';
  userData: Object;
  course:Course = null;
  active:any = 'brak';
  constructor(private activeCourseService: ActiveCourseService,private router: Router,private authService: AuthService,public afAuth: AngularFireAuth,private courseService :CoursesServiceService){

    console.log(this.userData);
  }

  updateActive(){
    this.active = this.activeCourseService.getActiveCourse();
    this.router.navigate(['/details',this.active]);
  }

  logOut(){
    this.authService.SignOut();
  }
  isUser(){
    return !this.authService.isLoggedIn();
  }
  a(){
    // console.log(this.authService.isLoggedIn());
    console.log(this.courseService.getMaxId());
  }
  ngOnInit(){
    this.authService.getUser().subscribe(
      user => {if(user != null){
        console.log("Elo2 "+ user)
        this.userData = user;

      }else{console.log("Elo "+ user);this.userData= new Object; this.userData={email: " "};}

      });
  }
}
