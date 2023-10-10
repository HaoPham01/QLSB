import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = 'https://localhost:7199/Admin/'
  private adminPayload:any;
  constructor(private http : HttpClient, private router: Router) {
    this.adminPayload = this.decodedToken(); }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue);
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getEmailFromToken(){
    if(this.adminPayload)
    return this.adminPayload.email;
  }

  getRoleFromToken(){
    if(this.adminPayload)
    return this.adminPayload.role;
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }
}
