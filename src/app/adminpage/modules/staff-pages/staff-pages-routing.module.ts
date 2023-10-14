import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingfieldComponent } from './bookingfield/bookingfield.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent},
  { path: 'qlbooking', component: BookingfieldComponent,},
  // { path: 'qlfield', component: FootballfieldComponent,},
  // { path: 'qluser', component: UserComponent,},
  // { path: 'qlnews', component: NewsComponent,}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPagesRoutingModule { }
