import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  errorMessage:string = '';
  successMessage:string = '';
  registerForm : FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['',[Validators.required]],
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]]
    });
  }

  tryJoin(form){
    console.log(form);
    this.authService.SignUpUser(form.email,form.password,form.lastName,form.name);
  }

}
