import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/adminpage/shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PagesRoutingModule } from './pages-routing.module';
import { StatusPipe } from 'src/app/adminpage/pipe/status.pipe';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FootballfieldComponent } from './footballfield/footballfield.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { UserComponent } from './user/user.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [AdminComponent,StatusPipe, FootballfieldComponent, UserComponent, NewsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ToolbarModule,
    TableModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    PagesRoutingModule,
    BreadcrumbModule,
    
  ],
  providers: [MessageService,ConfirmationService],
})
export class PagesModule { }
