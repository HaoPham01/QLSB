import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private messageService: MessageService, private auth: AuthService, private router: Router) {

  }
  canActivate(): boolean {
    const tokenPayload = this.auth.decodedToken();
    if (this.auth.isLoggedIn() && tokenPayload.role == 'admin'
    ) {
      return true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không đủ quyền, vui lòng đăng nhập bằng tài khoản admin',
        life: 5000,
      });
      this.router.navigate(['login']);
      localStorage.clear();
      return false;
    }
  }
}
