import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import ValidateForm from 'src/app/adminpage/helpers/validateform';
import { AuthService } from 'src/app/adminpage/services/auth.service';
import { AdminStoreService } from '../../services/admin-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


loginForm!: FormGroup;
constructor(private fb: FormBuilder, private router: Router,private auth: AuthService, private messageService: MessageService, private adminStore: AdminStoreService){}

ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
  })
}
onLogin(){
  if(this.loginForm.valid){
  console.log(this.loginForm.value);

  this.auth.login(this.loginForm.value).subscribe({
    next:(res)=>{
      this.auth.storeToken(res.accessToken);
      this.auth.storeRefreshToken(res.refreshToken);
      const tokenPayload = this.auth.decodedToken();
      this.adminStore.setEmailForStore(tokenPayload.email);
      this.adminStore.setRoleForStore(tokenPayload.role);
      if(tokenPayload.role == 'admin') {
        this.router.navigate(['admin']);  
      } else
      {
        this.router.navigate(['staff']);  
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đăng nhập thành công',
        life: 5000,
      });
      
    },
    error:(err)=>{
      console.log(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: err?.message,
        life: 5000,
      });
    }
  })
  }else{

  ValidateForm.validateAllFormFields(this.loginForm);
  this.messageService.add({
    severity: 'error',
    summary: 'Lỗi',
    detail: 'Phải nhập Email và mật khẩu',
    life: 5000,
  });
  }
}



}
