import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from 'src/app/userpage/services/api.service';
import { AuthService } from 'src/app/userpage/services/auth.service';
import { UserStoreService } from 'src/app/userpage/services/user-store.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import  timeGridPlugin  from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import interactionPlugin from '@fullcalendar/interaction';
import { Booking } from 'src/app/adminpage/models/booking.model';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private messageService: MessageService, private route: Router) { }
  
  activeTabId: string | undefined;
  tabs = [
    { fieldId: '', fieldName: '' ,type: ''},
  ];

  public confirmBookingDialog = false;

  ngOnInit() {
    // need for load calendar bundle first
    forwardRef(() => Calendar);

    this.calendarOptions = {
    plugins: [ timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    weekends: true,
    // events: this.getEvents(), 
    headerToolbar: {
      center: 'title', 
      start: 'today',
      end: 'prev,next'
    },
    slotDuration: '00:30:00',
    slotLabelInterval: '01:00:00',
    locale: viLocale, // Thêm ngôn ngữ tiếng Việt vào đây
    weekNumbers: true,
     validRange: {
      start: new Date() // Lịch chỉ hiển thị từ hôm nay trở đi
     },
    selectable: true, // Cho phép chọn khoảng thời gian
    select: this.handleDateSelect.bind(this),
     // Bắt sự kiện khi chọn
    slotMinTime: '06:00:00', // Giới hạn thời gian từ 6 AM
    slotMaxTime: '23:00:00',  // Giới hạn thời gian đến 11 PM
    allDaySlot: false, // Bỏ chọn cả ngày
    //eventColor: '#04BFBF',

    };
    this.getEvents();
    this.getFieldList();
  }
  
  handleDateSelect(info: any) {
    this.booking.startTime = info.startStr;
    this.booking.endTime = info.endStr;
    
    const datePipe = new DatePipe('en-US');
    // Chuỗi thời gian đầu vào
    const startStr = info.startStr;
    const endStr = info.endStr;
    // Chuyển đổi chuỗi thành đối tượng giờ
    const startDateTime = datePipe.transform(startStr, 'HH:mm:ss');
    const endDateTime = datePipe.transform(endStr, 'HH:mm:ss');
    if(startDateTime && endDateTime){
    this.api.getPriceField(this.booking.fieldId, startDateTime, endDateTime).subscribe(res=>{
      this.booking.priceBooking = res[0].price
    });
    }

    this.fullName = localStorage['fullName'];
    this.api.getNameFieldById(this.booking.fieldId).subscribe((res) => {
      this.fieldName = res.fieldName;
    },
    (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: err.message,
        life: 3000,
      });
    },);

    const userId = localStorage['userId'];
    this.booking.userId = parseInt(userId);
    console.log(info)
    this.confirmBookingDialog = true;
  }


  getEvents(){
    this.api.getBooking().subscribe(res=>{
      this.calendarOptions!.events = res;
      this.booking.fieldId = res[0].fieldId;
      this.activeTabId = res[0].fieldId;
    });
  }
  
  getEventsFromField(payload: any){
    this.activeTabId = payload;
    this.api.getBookingFromFieldId(payload).subscribe(res=>{
      this.calendarOptions!.events = res;
      console.log(res);
    });
    this.booking.fieldId = payload;

  }
  
  getFieldList(){
    this.api.getFieldList().subscribe(res=>{
      this.tabs = res;
    });
  }
  reloadCalendar() {
    this.getEvents();
  }

  public bookings: Booking[] = [];
  private newBooking: Booking = {
    bookingId: 0,
    userId: 0,
    fieldId: 0,
    priceBooking: '',
    startTime: new Date(),
    endTime: new Date(),
    status: -1,
    createDate: new Date(),
    updateDate: new Date(),
  };
  public booking: Booking = Object.assign({}, this.newBooking);
  public fullName = '';
  public fieldName : string = '';


  thanhToan(){
  if(this.auth.isLoggedIn()== false){
    this.messageService.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Vui lòng đăng nhập để thanh toán',
      life: 3000,
    });
  }else {
  this.api.addBooking(this.booking).subscribe(res=>{
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Thêm thành công',
      life: 3000,
    });
    const id = res
    this.confirmBookingDialog = false;
    this.route.navigate(['booking/checkout', id]);
  });

  }
  }
}