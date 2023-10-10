import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { UserStoreService } from '../../services/user-store.service';
import ValidateForm from 'src/app/adminpage/helpers/validateform';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private auth: AuthService, private messageService: MessageService, private userStore: UserStoreService){}
  
  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        UserId: 0,
        Email: ['', Validators.required],
        Password: ['', Validators.required],
        FullName: ['', Validators.required],
        Address: ['', Validators.required],
        Phone: ['', Validators.required],
        Status: 1,
        CreateDate: new Date,
        UpdateDate: new Date
    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignUp(){
  if(this.signUpForm.valid){
    this.auth.signUp(this.signUpForm.value).subscribe({
      next: (res =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: res.message,
          life: 5000,
        });
        this.router.navigate(['/userLogin']);
      }),
      error:(err=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: err?.message,
          life: 5000,
        });
      })
    })
  }else{
      ValidateForm.validateAllFormFields(this.signUpForm);
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Phải nhập Email và mật khẩu',
        life: 5000,
      });
      }

}
}