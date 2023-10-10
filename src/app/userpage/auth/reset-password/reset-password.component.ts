import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from 'src/app/adminpage/models/reset-password.model';
import { ApiService } from '../../services/api.service';
import { matchPassword } from 'src/app/adminpage/helpers/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from 'src/app/adminpage/helpers/validateform';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj = new ResetPassword();
  constructor(private fb: FormBuilder,private router: Router,  private api: ApiService, private activatedRoute: ActivatedRoute, private messageService: MessageService){}
  
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null,Validators.required],
      confirmPassword: [null,Validators.required]
     },{
       validators: matchPassword 
     });

     this.activatedRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken= uriToken.replace(/ /g, '+');
      console.log(this.emailToken);
      console.log(this.emailToReset);
     })
  }
  
  reset(){
    if(this.resetPasswordForm.valid){
    this.resetPasswordObj.email = this.emailToReset;
    this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
    this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
    this.resetPasswordObj.emailToken = this.emailToken;
    this.api.resetPassword(this.resetPasswordObj).subscribe({
      next:(res)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: res.message,
          life: 5000,
        });
        this.router.navigate(['/userLogin']);
      },
      error:(err)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: err?.message,
            life: 5000,
          });
        }
    })
  }
  else{
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }
  
}
