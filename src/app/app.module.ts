import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './adminpage/layouts/layouts.module';
import { LoginComponent } from './adminpage/auth/login/login.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './adminpage/guards/auth.guard';
import { AuthService } from './adminpage/services/auth.service';
import { TokenInterceptor } from './adminpage/interceptors/token.interceptor';
import { UserLoginComponent } from './userpage/auth/login/user-login.component';
import { SignUpComponent } from './userpage/auth/sign-up/sign-up.component';
import { UserAuthGuard } from './userpage/guards/userauth.guard';
import { HomepageComponent } from './userpage/modules/pages/homepage/homepage.component';
import { UserModule } from './userpage/user.module';
import { AdminModule } from './adminpage/admin.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true},MessageService, ConfirmationService,
    UserAuthGuard, 
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
