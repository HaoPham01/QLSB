import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import ValidateForm from 'src/app/adminpage/helpers/validateform';
import { AuthService } from 'src/app/userpage/services/auth.service';
import { UserStoreService } from '../../services/user-store.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

    type: string = "password";
    isText: boolean = false;
    eyeIcon: string = "fa-eye-slash";
    public resetPasswordEmail!: string;
    public isValidEmail!: boolean;
    loginForm!: FormGroup;
    constructor(private fb: FormBuilder, private router: Router,private auth: AuthService, private messageService: MessageService, private userStore: UserStoreService, private api: ApiService){}
    
    ngOnInit(): void {
        this.loginForm = this.fb.group({
          Email: ['', Validators.required],
          Password: ['', Validators.required]
      })
    }
    hideShowPass(){
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
    }
    onLogin(){
      if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
    
          // this.auth.storeToken(res.token);
    
          this.auth.storeToken(res.accessToken);
          // console.log(this.auth.storeToken(res.Token));
    
          this.auth.storeRefreshToken(res.refreshToken);
          // console.log(res.RefreshToken);
    
          const tokenPayload = this.auth.decodedToken();
          // console.log(tokenPayload);
          this.userStore.setEmailForStore(tokenPayload.email);
          this.userStore.setFullNameForStore(tokenPayload.fullName);
          this.router.navigate(['']);
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
    
    
    checkValidEmail(event: string){
      const value = event;
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
      this.isValidEmail = pattern.test(value);
      return this.isValidEmail;
    }

     confirmToSend(){
      if(this.checkValidEmail(this.resetPasswordEmail)){
        console.log(this.resetPasswordEmail);
        this.api.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
          next:(res)=>{
            this.messageService.add({
              severity: 'success',
              summary: 'Reset Thành công',
              detail: res.message,
              life: 3000,
            });
            this.resetPasswordEmail = "";
            const buttonRef = document.getElementById("closeBtn")
            buttonRef?.click();
          },
          error:(err)=>{
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: err?.message,
              life: 3000,
            });
          }
        })
      }
     }
}
    

