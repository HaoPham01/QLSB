import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { admin } from 'src/app/adminpage/models/admin.model';
import { AuthService } from 'src/app/adminpage/services/auth.service';
import { DataService } from 'src/app/adminpage/services/data.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  public admins: admin[] = [];
  public adminDialog = false;
  private newAdmin: admin = {
    adminId: 0,
    email: '',
    password: '',
    fullName: '',
    role: 'admin',
    token:'',
    status: '1',
    createDate: new Date(),
    updateDate: new Date(),
  };
  
  public admin: admin = Object.assign({}, this.newAdmin);
  public submitted = true;
  public loading = true;
  public hidePass = false;
  public keyword = '';
  

  public ngOnInit() {
     this.loadAdmin();
    }
    
  public searchAdmin(keyword: string) {
    this.dataService.search(keyword).subscribe((data) => {
      console.log(data);
      this.admins = data;
    });
  }

  public loadAdmin(): void {
    this.loading = true;
    this.dataService.getAllAdmins().subscribe((data) => {
      this.admins = data;
      this.loading = false;
      console.log('admins', data);
    });
  }
  // SelectedAdmins() {
  //     this.confirmationService.confirm({
  //         message: 'Are you sure you want to delete the selected admins?',
  //         header: 'Confirm',
  //         icon: 'pi pi-exclamation-triangle',
  //         accept: () => {
  //             this.admins = this.admins.filter(val => !this.selectedAdmins.includes(val));
  //             this.selectedAdmins = null;
  //             this.messageService.add({severity:'success', summary: 'Successful', detail: 'admins Deleted', life: 3000});
  //         }
  //     });
  // }




  public editAdmin(admin: admin): void{
    console.log('editAdmin:', admin);
    this.admin = admin;
    this.adminDialog = true;
    this.hidePass = true;
  }

  public deleteAdmin(admin: admin): void{
    console.log('deleteAdmin:', admin);  
    this.confirmationService.confirm({
          message: 'Bạn có chắc muốn xóa ' + admin.email + 'không?',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.dataService.deleteAdmins(admin).subscribe((data) => {
            console.log('return data =', data);
            this.loadAdmin();
          
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
    this.admin = Object.assign({}, this.newAdmin);
    this.adminDialog = true;
    this.hidePass = false;
  }
  public hideDialog(cancel = true, success = true, edit = true): void {
    console.log('hide dialog');
    this.adminDialog = false;
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
    this.loadAdmin();
  } 
  
  public saveAdmin(): void{
    console.log('saveAdmin:', this.admin);
    if(this.admin.adminId === 0){
    this.dataService.postAdmins(this.admin).subscribe(
      (data) => {
        console.log('return data =', data);
        this.hideDialog(false, true, false);
      },
       (error) => {
        this.hideDialog(false, false, false);
       }
    );
  } else{
    this.dataService.putAdmins(this.admin).subscribe(
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
