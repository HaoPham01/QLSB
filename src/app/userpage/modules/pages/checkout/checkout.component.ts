import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/adminpage/services/auth.service';
import { ApiService } from 'src/app/userpage/services/api.service';
import { UserStoreService } from 'src/app/userpage/services/user-store.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Hết thời gian',
      detail: 'Thanh toán lịch sân đã bị hủy',
      life: 3000
    });
  }

  @HostListener('window:hashchange', ['$event'])
  hashChangeHandler(event: Event) {
  // Code xử lý khi chuyển trang
  this.messageService.add({
    severity: 'info',
    summary: 'Đã chuyển trang',
    detail: 'Bạn đã chuyển trang',
    life: 3000
  });
}


  constructor(private confirmationService: ConfirmationService, private activeRoute:ActivatedRoute ,private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private messageService: MessageService, private route: Router) { }

  public active = false; // chuyển hướng không hiển thị hộp thoại

  public bookingId = 0;
  public bookings = {
    bookingId: 0,
    userId: 0,
    fieldId: 0,
    priceBooking: '',
    startTime: new Date(),
    endTime: new Date(),
    status: 1,
    createDate: new Date(),
    updateDate: new Date(),
    fullName: '',
    fieldName: ''
  };
  
  public vnPay = {
    typePaymentVN: 2,
    orderCode: 0
  }

  countdown: number = 300; // 5 minutes in seconds
  apiCalled = false;
  myFunction(): boolean{
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn rời khỏi trang này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.cancelStatusBooking(this.vnPay.orderCode).subscribe(
          (response) => {
            console.log(response.message);
          },
          (error) => {
            console.log(error.message);
          });
        this.messageService.add({
          severity: 'warn',
          summary: 'Hết thời gian',
          detail: 'Thanh toán lịch sân đã bị hủy',
          life: 3000});
          return true;
      }
  }); return false;
  }
  ngOnInit(){
  
    const idURL = this.activeRoute.snapshot.paramMap.get('id');
    this.api.getBookingById(idURL).subscribe(res=>{
      if(res[0].status == -1){
      this.bookings = res[0];
      console.log(this.bookings);
      this.vnPay.orderCode = res[0].bookingId;
      }else{
          this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Thanh toán lịch sân không tồn tại',
          life: 3000,
        });
          this.route.navigate(['']);        

      }
    });
    const storedCountdown = localStorage.getItem('countdown');
    if (storedCountdown) {
      if(storedCountdown != '0')
      this.countdown = parseInt(storedCountdown, 10);
    } else {
      this.countdown = 300; // Khởi tạo giá trị countdown ban đầu (5 phút)
    }
    setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        localStorage.setItem('countdown', this.countdown.toString()); // Lưu giá trị countdown
      } else {
        if (!this.apiCalled) {
          this.api.cancelStatusBooking(idURL).subscribe(
            (response) => {
              console.log(response.message);
            },
            (error) => {
              console.log(error.message);
            }
          );
        this.messageService.add({
          severity: 'warn',
          summary: 'Hết thời gian',
          detail: 'Thanh toán lịch sân đã bị hủy',
          life: 3000,
        });
        this.apiCalled = true; // Đánh dấu rằng API đã được gọi
        this.route.navigate(['']);}
      }
    }, 1000);
  }
  thanhToan() {
    this.active = true;
    this.api.getVnpay(this.vnPay.typePaymentVN, this.vnPay.orderCode).subscribe((response) => {
      this.apiCalled = true;
      window.location.href = response.url;
    },
    (error) => {
      console.log();
    },);
  }



  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(seconds).padStart(2, '0');
  
    return `${minutesString}:${secondsString}`;
  }
  
}
