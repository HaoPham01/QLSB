import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { staffBooking } from 'src/app/adminpage/models/booking.model';
import { DataService } from 'src/app/adminpage/services/data.service';

@Component({
  selector: 'app-bookingfield',
  templateUrl: './bookingfield.component.html',
  styleUrls: ['./bookingfield.component.scss']
})
export class BookingfieldComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  public staffBookings: staffBooking[] = [];
  public staffBookingDialog = false;
  private newStaffBooking: staffBooking = {
    bookingId: 0,
    userId: 0,
    fieldId: 0,
    priceBooking: '',
    startTime: new Date(),
    endTime: new Date(),
    status: 0,
    createDate: new Date(),
    updateDate: new Date(),
    fullName: '',
    phone: '',
    fieldName: '',
  };
  
  public staffBooking: staffBooking = Object.assign({}, this.newStaffBooking);
  public submitted = true;
  public loading = true;
  public hidePass = false;
  public keyword = '';
  

  public ngOnInit() {
     this.loadStaffBooking();
    }
    
  public searchStaffBooking(keyword: string) {
    this.dataService.search(keyword).subscribe((data) => {
      this.staffBookings = data;
    });
  }

  public loadStaffBooking(): void {
    this.loading = true;
    this.dataService.getBookingField().subscribe((data) => {
      this.staffBookings = data;
      this.loading = false;
    });
  }

  // public editStaffBooking(staffBooking: staffBooking): void{
  //   console.log('editStaffBooking:', staffBooking);
  //   this.staffBooking = staffBooking;
  //   this.staffBookingDialog = true;
  //   this.hidePass = true;
  // }

  // public deleteStaffBooking(staffBooking: staffBooking): void{
  //   console.log('deleteStaffBooking:', staffBooking);  
  //   this.confirmationService.confirm({
  //         message: 'Bạn có chắc muốn xóa ' + staffBooking.email + 'không?',
  //         header: 'Xác nhận',
  //         icon: 'pi pi-exclamation-triangle',
  //         accept: () => {
  //           this.dataService.deleteStaffBookings(staffBooking).subscribe((data) => {
  //           console.log('return data =', data);
  //           this.loadStaffBooking();
          
  //           });
            
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Successful',
  //             detail: 'Xóa thành công',
  //             life: 3000,
  //           });  
          
  //         }
  //     });
  // }
  // public openNew() {
  //   console.log('open new');
  //   this.staffBooking = Object.assign({}, this.newStaffBooking);
  //   this.staffBookingDialog = true;
  //   this.hidePass = false;
  // }
  // public hideDialog(cancel = true, success = true, edit = true): void {
  //   console.log('hide dialog');
  //   this.staffBookingDialog = false;
  //   if(cancel){
  //     this.messageService.add({
  //       severity: 'info',
  //       summary: 'Hủy',
  //       detail: 'Đã hủy!',
  //       life: 3000,
  //     });
  //   } else if (success){
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Thành công',
  //       detail: 'Thêm mới tài khoản thành công',
  //       life: 3000,
  //     });
  //   }else if(edit){
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Thành công',
  //       detail: 'Chỉnh sửa tài khoản thành công',
  //       life: 3000,
  //     });
  //   }else this.messageService.add({
  //     severity: 'error',
  //     summary: 'Lỗi',
  //     detail: 'Thao tác bị lỗi',
  //     life: 3000,
  //   });
  //   this.loadStaffBooking();
  // } 
  
  // public saveStaffBooking(): void{
  //   console.log('saveStaffBooking:', this.staffBooking);
  //   if(this.staffBooking.staffBookingId === 0){
  //   this.dataService.postStaffBookings(this.staffBooking).subscribe(
  //     (data) => {
  //       console.log('return data =', data);
  //       this.hideDialog(false, true, false);
  //     },
  //      (error) => {
  //       this.hideDialog(false, false, false);
  //      }
  //   );
  // } else{
  //   this.dataService.putStaffBookings(this.staffBooking).subscribe(
  //     (data) => {
  //       console.log('return data =', data);
  //       this.hideDialog(false, false, true);
  //     },
  //     (error) => {
  //       console.log('error');
  //       this.hideDialog(false, false, false);
  //     },
  //     );
  // }
  // }

}

