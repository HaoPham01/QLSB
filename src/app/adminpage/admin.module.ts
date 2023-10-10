import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppComponent } from '../app.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutsModule } from './layouts/layouts.module';




@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule
  ],
  providers: [
   MessageService],
 bootstrap: [AppComponent]
})
export class AdminModule { }
