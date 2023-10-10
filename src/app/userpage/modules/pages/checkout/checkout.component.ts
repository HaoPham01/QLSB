import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/adminpage/services/auth.service';
import { ApiService } from 'src/app/userpage/services/api.service';
import { UserStoreService } from 'src/app/userpage/services/user-store.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute ,private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private messageService: MessageService) { }
  //public idUrl = '';
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
  ngOnInit() { 
    const idURL = this.activeRoute.snapshot.paramMap.get('id');
    //this.bookingId = parseInt(idURL);
    this.api.getBookingById(idURL).subscribe(res=>{
      this.bookings = res[0];
      console.log(this.bookings);
      this.vnPay.orderCode = res[0].bookingId;
    });
  }
  thanhToan() {
    // this.api.getVnpay(this.vnPay.typePaymentVN, this.vnPay.orderCode).subscribe((data) => {
    //   console.log('return data =', data);
    // },
    // (error) => {
    //   console.log(error);
    // },);


    this.api.getVnpay(this.vnPay.typePaymentVN, this.vnPay.orderCode).subscribe((response) => {
      window.location.href = response;
    },
    (error) => {
      console.log("loi");
    },);
  }

}
