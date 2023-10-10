import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './auth/login/user-login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserAuthGuard } from './guards/userauth.guard';
import { MessageService } from 'primeng/api';
import { AppComponent } from '../app.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { TokenInterceptor } from '../adminpage/interceptors/token.interceptor';
import { PagenotfoundComponent } from './auth/pagenotfound/pagenotfound.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookingComponent } from './modules/pages/booking/booking.component';
import { SharedModule } from './shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { CheckoutComponent } from './modules/pages/checkout/checkout.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    SignUpComponent,
    HomepageComponent,
    ResetPasswordComponent,
    PagenotfoundComponent,
    BookingComponent,
    ContactComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
    BreadcrumbModule,

  ],
  providers: [
   MessageService],
 bootstrap: [AppComponent]
})
export class UserModule { }
