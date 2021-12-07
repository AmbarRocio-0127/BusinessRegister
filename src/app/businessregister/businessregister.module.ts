import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessregisterPageRoutingModule } from './businessregister-routing.module';

import { BusinessregisterPage } from './businessregister.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessregisterPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [BusinessregisterPage],
})
export class BusinessregisterPageModule {}
