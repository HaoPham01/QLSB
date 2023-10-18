import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { staffBooking } from 'src/app/adminpage/models/booking.model';
import { DataService } from 'src/app/adminpage/services/data.service';
import { ApiService } from 'src/app/userpage/services/api.service';


@Component({
  selector: 'app-bookingfield',
  templateUrl: './bookingfield.component.html',
  styleUrls: ['./bookingfield.component.scss']
})
export class BookingfieldComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService, private api: ApiService) { }
  activeTabId: string | undefined;
  tabs = [
    { fieldId: '', fieldName: '' ,type: ''},
  ];

  currentTime: Date = new Date();
  
  public staffBookings: staffBooking[] = [];
  public invoice = {
    bookingId: 0,
    userId: 0,
    fieldId: 0,
    priceBooking: 0,
    startTime: new Date(),
    endTime: new Date(),
    status: 0,
    createDate: new Date(),
    fullName: '',
    phone: '',
    fieldName: '',
    statusInvoice: 0,
    pricePay: 0,
    idInvoice: 0,
    adminCreate: '',
    payOnline: 0,
  };
  public confirmInvoice = {
    invoiceId: 0,
    adminEmail: localStorage['emailAdmin'],
    totalAmount: 0,
    createDate: new Date()
  }


   public services = [{
    svId: 0,
    bookingId: 0,
    quantity: 0,
    type: '',
    price: 0,
    totalPrice: 0,
  }]
  public newService = {
    svId: 0,
    bookingId: 0,
    quantity: 0,
    type: '',
    price: 0,
  }
 

  public confirmInvoiceDialog = false;
  public servicesDialog = false;

  public loading = true;
  public keyword = '';
  

  public ngOnInit() {
      this.getFieldList();
      this.loadStaffBooking();
      setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
    }
    
  public searchStaffBooking(keyword: string) {
    this.dataService.searchBookingByPhone(keyword).subscribe((data) => {
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

  getInvoice(bookingId: any){
    this.dataService.getInvoice(bookingId).subscribe((data) => {
      this.invoice = data[0];
      console.log(data[0]);
      this.invoice.createDate = new Date();
      this.confirmInvoice.createDate = this.invoice.createDate;
      this.confirmInvoice.invoiceId = data[0].idInvoice;
      this.dataService.getNameByEmail(localStorage['emailAdmin']).subscribe((data) => {
        this.invoice.adminCreate = data.message;
      },
       (error) => {
        console.log('return data =', error);
       })
    });
    this.dataService.getService(bookingId).subscribe((data) => {
      this.services = data;
    })
    this.dataService.getPriceInvoice(bookingId).subscribe((data) => {
      this.confirmInvoice.totalAmount = data.gia;
    })
    console.log(this.confirmInvoice);
    this.confirmInvoiceDialog = true;
  }

  thanhToan(){
  this.dataService.confirmInvoice(this.confirmInvoice).subscribe((data) => {
    this.confirmInvoiceDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Hoàn tất thanh toán',
      life: 3000,
    });
    this.loadStaffBooking();
    this.getFieldList();
    })
  }


  cancel(invoiceId: number){
    this.confirmInvoice.invoiceId = invoiceId;
    this.confirmationService.confirm({
          message: 'Xác nhận người dùng không nhận sân',
          header: 'Xác nhận',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.dataService.cancelInvoice(this.confirmInvoice).subscribe((data) => {
            this.loadStaffBooking();
            this.getFieldList();
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Xác nhận thành công',
              life: 3000,
            });  
          }
      });
  }



  getServices(bookingId: any){
    this.dataService.getService(bookingId).subscribe((data) => {
      this.services = data;
    })
    this.newService.bookingId = bookingId;
    this.servicesDialog = true;
  }
  addService(){
    this.dataService.addService(this.newService).subscribe((data) => {
      console.log('return data =', data);
      this.getServices(this.newService.bookingId);
    })
    this.newService.price = 0;
    this.newService.quantity = 0;
    this.newService.type = '';
  }
  removeService(sv_id: any){
    this.dataService.removeService(sv_id).subscribe((data) => {
      this.getServices(this.newService.bookingId);
    })
  }


  getFieldList(){
    this.api.getFieldList().subscribe(res=>{
      this.tabs = res;
      this.activeTabId = this.tabs[0].fieldId
    });
  }
  public loadStaffBookingFromField(payload: any): void {
    this.activeTabId = payload;
    this.dataService.getBookingFieldById(payload).subscribe((data) => {
      this.staffBookings = data;
      console.log(data)
    });
  }
}

