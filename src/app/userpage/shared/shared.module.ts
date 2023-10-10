import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,  
    SlideMenuModule,
    PanelMenuModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
  
})
export class SharedModule { }
