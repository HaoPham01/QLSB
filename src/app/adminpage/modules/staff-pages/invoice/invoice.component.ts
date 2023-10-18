import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { staffBooking } from 'src/app/adminpage/models/booking.model';
import { DataService } from 'src/app/adminpage/services/data.service';
import { ApiService } from 'src/app/userpage/services/api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService, private api: ApiService) { }
  date = new Date();
  dateString = '';
  invoiceDialog = false;
  public invoices = [{
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
    adminName: '',
  }]
  public newInvoice = {
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
    adminName: '',
    payOnline: 0,
  };

  public services = [{
    svId: 0,
    bookingId: 0,
    quantity: 0,
    type: '',
    price: 0,
    totalPrice: 0,
  }]
  public invoice = Object.assign({}, this.newInvoice);
  public confirmInvoiceDialog = false;
  public servicesDialog = false;

  public loading = true;
  public keyword = '';
  

  public ngOnInit() {
      this.getInvoice();
    }

  getInvoice(){
    this.dataService.staffGetInvoice(this.date).subscribe((data) => {
      this.invoices = data;
      console.log(data)
      this.loading = false;
    });
  }

  getInvoiceByDate(){
    const dateObject = new Date(this.dateString);
    this.dataService.staffGetInvoice(dateObject).subscribe((data) => {
      this.invoices = data;
      console.log(data)
      this.loading = false;
    });
  }


    
  public searchStaffBooking(keyword: string) {
    this.dataService.searchBookingByPhone(keyword).subscribe((data) => {
      this.invoices = data;
    });
  }

  refresh(){
    if (this.dateString == '') {
      this.getInvoice();
    } else {
      this.getInvoiceByDate();
    }
  }
  public cancel = false;
  getInvoiceDetail(invoices: any){
    this.cancel = false;
    this.invoice = invoices;
    this.dataService.getService(this.invoice.bookingId).subscribe((data) => {
      this.services = data;
    })
    console.log(this.invoice);
    if(this.invoice.pricePay == null)
      {
        this.cancel = true;
      }
    this.invoiceDialog = true;
  }
}
