import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        DefaultComponent,
    ],
    exports: [
        SharedModule
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class LayoutsModule { }
