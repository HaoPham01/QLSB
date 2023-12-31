import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/adminpage/shared/shared.module';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StatusPipe, StatusPrice } from 'src/app/adminpage/pipe/status.pipe';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StaffPagesRoutingModule } from './staff-pages-routing.module';
import { BookingfieldComponent } from './bookingfield/bookingfield.component';
import { LayoutComponent } from './layout/layout.component';
import { BookingAllComponent } from './booking-all/booking-all.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InvoiceComponent } from './invoice/invoice.component';



@NgModule({
  declarations: [StatusPrice ,BookingfieldComponent, LayoutComponent, BookingAllComponent, InvoiceComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToolbarModule,
    TableModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    StaffPagesRoutingModule,
    FullCalendarModule,
    
  ],
  providers: [MessageService,ConfirmationService],
})
export class StaffPagesModule { }
