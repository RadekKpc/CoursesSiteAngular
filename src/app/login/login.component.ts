import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage:string = '';
  successMessage:string = '';
  loginForm : FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private router: Router) {

   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['',[Validators.required]]
    });
    if(this.authService.isLoggedIn())this.router.navigate(['/list']);
  }

  tryLogin(form){
    this.authService.SignInUser(form.email,form.password);
  }
}
