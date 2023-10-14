import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class StaffAuthGuard{
  constructor(private messageService: MessageService, private auth : AuthService, private router : Router ){

  }
   canActivate():boolean{
    const tokenPayload = this.auth.decodedToken();
    if(this.auth.isLoggedIn() && tokenPayload.role == 'staff'
  ){  
       return true;
     }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Vui lòng đăng nhập bằng tài khoản nhân viên',
        life: 5000,
      });
      this.router.navigate(['login']);
      localStorage.clear();
      return false;
      }
    }
}
