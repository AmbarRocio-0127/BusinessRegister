import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessregisterPageRoutingModule } from './businessregister-routing.module';

import { BusinessregisterPage } from './businessregister.page';
import { ComponentsModule } from '../components/components.module';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessregisterPageRoutingModule,
    ComponentsModule,
    NgxMaskIonicModule,
  ],
  declarations: [BusinessregisterPage],
})
export class BusinessregisterPageModule {}
