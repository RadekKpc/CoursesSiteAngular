import { Component,OnInit } from '@angular/core';
import { Course } from './Interfaces/course';
import {ActiveCourseService} from './active-course.service';
import {Router} from "@angular/router";
import {AuthService} from './auth.service';
import {AngularFireAuth} from  '@angular/fire/auth';
import {AuthGuard,NotAuthGuard} from './guard/auth.guard';
import {Observable,Observer} from 'rxjs';
import { CoursesServiceService } from './courses-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userJustLoggin: number =0;
  title = 'KopecProject';
  userData: Object = {email: " "};
  course:Course = null;
  active:any = 'brak';
  canAdding:boolean;
  constructor(private activeCourseService: ActiveCourseService,private router: Router,private authService: AuthService,public afAuth: AngularFireAuth,private courseService :CoursesServiceService){
    this.ngOnInit();
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
  isUser2(){
    if(this.authService.isLoggedIn()){
      this.courseService.getUser().subscribe(c => { this.canAdding = c[3]['adding'];})
      return !this.canAdding;
    }
    return !this.authService.isLoggedIn();
  }
  a(){
    // console.log(this.authService.isLoggedIn());
    console.log(this.courseService.canDelete());
    console.log(this.courseService.canAdd())
  }
  ngOnInit(){
    this.authService.getUser().subscribe(
      user => {if(user != null){
        this.userData = user;
        //this part slove the problem of changing direct to login and register while user is logged in but is not have finded out yet
        if(this.userJustLoggin == 0)this.router.navigate(['/list']);
        this.userJustLoggin++;

      }else{
        this.userJustLoggin = 0;
        this.userData= new Object;
         this.userData={email: " "}; }

      });
  }
  canAdd(){
    return this.canAdding;
  }
}
