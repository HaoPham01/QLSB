import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { user } from 'src/app/adminpage/models/user.model';
import { AuthService } from 'src/app/userpage/services/auth.service';
import { DataService } from 'src/app/adminpage/services/data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  public users: user[] = [];
  public userDialog = false;
  private newUser: user = {
    userId: 0,
    email: '',
    password: '',
    fullName: '',
    address: '',
    phone:'',
    status: '1',
    createDate: new Date(),
    updateDate: new Date(),
  };
  
  public user: user = Object.assign({}, this.newUser);
  public submitted = true;
  public loading = true;
  public hidePass = false;
  public keyword = '';
  

  public ngOnInit() {
     this.loadUser();
    }
    
  public searchUser(keyword: string) {
    this.dataService.searchUser(keyword).subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }

  public loadUser(): void {
    this.loading = true;
    this.dataService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
      console.log('users', data);
    });
  }


  public editUser(user: user): void{
    console.log('editUser:', user);
    this.user = user;
    this.userDialog = true;
    this.hidePass = true;
  }

  public deleteUser(user: user): void{
    this.confirmationService.confirm({
          message: 'Bạn có chắc muốn xóa ' + user.email + 'không?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.dataService.deleteUser(user).subscribe((data) => {
            this.loadUser();
            });
            
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Xóa thành công',
              life: 3000,
            });  
          
          }
      });
  }
  public openNew() {
    console.log('open new');
    this.user = Object.assign({}, this.newUser);
    this.userDialog = true;
    this.hidePass = false;
  }
  public hideDialog(cancel = true, success = true, edit = true): void {
    console.log('hide dialog');
    this.userDialog = false;
    if(cancel){
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'Đã hủy!',
        life: 3000,
      });
    } else if (success){
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thêm mới tài khoản thành công',
        life: 3000,
      });
    }else if(edit){
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Chỉnh sửa tài khoản thành công',
        life: 3000,
      });
    }else this.messageService.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Thao tác bị lỗi',
      life: 3000,
    });
    this.loadUser();
  } 
  
  public saveUser(): void{
    console.log('saveUser:', this.user);
    if(this.user.userId === 0){
    this.dataService.postUser(this.user).subscribe(
      (data) => {
        console.log('return data =', data);
        this.hideDialog(false, true, false);
      },
       (error) => {
        alert(error.error.message)
        this.hideDialog(false, false, false);
       }
    );
  } else{
    this.dataService.putUser(this.user).subscribe(
      (data) => {
        console.log('return data =', data);
        this.hideDialog(false, false, true);
      },
      (error) => {
        console.log('error');
        this.hideDialog(false, false, false);
      },
      );
  }
  }

}
