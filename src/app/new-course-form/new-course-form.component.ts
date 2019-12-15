import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
import {CoursesServiceService} from '../courses-service.service';
import {Course} from '../Interfaces/course'
import  Rating  from '../Interfaces/rating';
@Component({
  selector: 'app-new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent implements OnInit {

  modelForm : FormGroup;
  private validationMessages = {
    name: {
      required: 'Name is required'
    },
    ects: {
      required: 'Ects jest wymagany',
      maxlength: 'Maksymalna długość to 3 znaki'
    },
    semestr: {
      required: 'Semestr jest wymagany'
    },
    forma: {
      required: 'Forma prowadzenia zajęć jest wymagana'
    },
    maxStudents: {
      required: 'Maksymalna liczba studentów jest wymagana',
      maxlength: 'Maksymalna długość to 3 znaki'
    },
    desc: {
      required: 'Opis jest wymagany'
    },
    url: {
      required: 'Adres do miniaturki jest wymagany',
      pattern: 'wklej właściwy link'
    }
  }

  formErrors = {
    name: '',
    ects: '',
    semestr: '',
    forma: '',
    maxStudents: '',
    desc: '',
    url: ''
  }

  constructor(private formBuilder: FormBuilder,private coursesService: CoursesServiceService) {}

  // urlIsCorrect(url):boolean {
  //     if(url.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png|jpeg).*/g) === null) return false;
  //     return true;
  // }
  // urlValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   if (control.value !== undefined && (isNaN(control.value) || !(this.urlIsCorrect(control.value)) )){
  //     return { 'url': true };
  //   }
  // return null;
  // }

  ngOnInit() :void{

    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      ects: ['',[Validators.required,Validators.maxLength(3)]],
      semestr: [1,Validators.required],
      forma: ['',Validators.required],
      maxStudents: ['',[Validators.required,Validators.maxLength(3)]],
      // rating: ['',Validators.required],
      desc: ['',Validators.required],
      url: ['',[Validators.required]]
    });

    this.modelForm.valueChanges.subscribe((value) => {
      this.onControlValueChanged();
    });

    this.onControlValueChanged();

  }

onControlValueChanged() {
  const form = this.modelForm;

  for (let field in this.formErrors) {
    this.formErrors[field] = '';
    let control = form.get(field);

    if (control && control.dirty && !control.valid) {
      const validationMessages = this.validationMessages[field];

      for (const key in control.errors) {
        this.formErrors[field] += validationMessages[key] + ' ';
      }
    }
  }
}
onSubmit(modelForm){
  console.log("asd");
  let rating: Rating = {
  allRatingCounter: 0,
  sumRating: 0,
  users: {

  }
  }
  let course:Course = {
    id: 'a',
    desc: modelForm.value.desc,
    forma: modelForm.value.forma,
    url: modelForm.value.url,
    ects: modelForm.value.ects,
    maxStudents: modelForm.value.maxStudents,
    name: modelForm.value.name,
    rating: rating,
    semestr: modelForm.value.semestr,
    occupiedPlaces: 0
  };
  this.coursesService.addCours(course);
}


}
