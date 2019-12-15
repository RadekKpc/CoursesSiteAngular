import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesServiceService } from './courses-service.service';
import { RatingComponent } from './rating/rating.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SearchCoursePanelComponent } from './search-course-panel/search-course-panel.component';
import {SearchPipe,SearchPipeSemestr,SearchPipeRatingRange,SearchPipeEctsRange} from './Pipes/SearchPipeSemestr';
import { ValuesPipe} from './Pipes/OnlyValuesPipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import {ActiveCourseService} from './active-course.service';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireModule} from "@angular/fire";
import { AngularFireAuthModule} from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {AuthGuard,NotAuthGuard} from './guard/auth.guard';
import {HttpClientModule} from '@angular/common/http'
import {DataBaseService} from './data-base.service';

const routes: Routes = [
  {path:'', redirectTo: '/list',pathMatch: 'full' },
  {path:'list',component: CoursesListComponent, canActivate: [AuthGuard]},
  {path:'addnew',component: NewCourseFormComponent, canActivate: [AuthGuard]},
  {path:'details/:id',component: CourseDetailsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'register', component: RegistrationComponent,canActivate: [NotAuthGuard] },
  // { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}

]




@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CoursesListComponent,
    RatingComponent,
    NewCourseFormComponent,
    SearchCoursePanelComponent,
    SearchPipe,
    ValuesPipe,
    SearchPipeSemestr,
    SearchPipeRatingRange,
    SearchPipeEctsRange,
    CourseDetailsComponent,
    RegistrationComponent,
    LoginComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule

  ],
  exports: [RouterModule],
  providers: [CoursesServiceService,ActiveCourseService,AuthService,DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
