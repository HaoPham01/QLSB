import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor( private auth : AuthService, private router : Router ){

  }
   canActivate():boolean{
    const tokenPayload = this.auth.decodedToken();
    if(this.auth.isLoggedIn() && tokenPayload.role
    //&& this.auth.getRoleFromToken()=='admin'
  ){  
       return true;
     }else{
      this.router.navigate(['login']);
      localStorage.clear();
      return false;
      }
    }
}
