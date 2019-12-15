import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router){}

  canActivate(): boolean {
    console.log("A: "  +this.authService.isLoggedIn());

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router){}

  canActivate(): boolean {
    console.log("NotA: "  + this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['list']);
      return false;
    }
    return true;
  }
}