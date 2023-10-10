import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from 'src/app/adminpage/models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = 'https://localhost:7199/User/'
  private userPayload:any;
  constructor(private http : HttpClient, private router: Router) {
    this.userPayload = this.decodedToken(); }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  
  signUp(signUpObj: any){
    return this.http.post<any>(`${this.baseUrl}register`, signUpObj);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/userLogin']);
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
    return jwtHelper.decodeToken(token);
  }

  getEmailFromToken(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }
}
