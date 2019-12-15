import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:string = '';
  successMessage:string = '';
  loginForm : FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  tryLogin(form){
    this.authService.SignInUser(form.email,form.password);
  }
}
