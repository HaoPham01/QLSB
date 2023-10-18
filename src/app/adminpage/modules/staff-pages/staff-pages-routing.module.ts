import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingfieldComponent } from './bookingfield/bookingfield.component';
import { BookingAllComponent } from './booking-all/booking-all.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent},
  { path: 'qlbooking', component: BookingfieldComponent,},
  { path: 'qlbookingall', component: BookingAllComponent,},
  { path: 'qlinvoice', component: InvoiceComponent,},
  // { path: 'qluser', component: UserComponent,},
  // { path: 'qlnews', component: NewsComponent,}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPagesRoutingModule { }
