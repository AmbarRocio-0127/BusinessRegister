import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinesseditPageRoutingModule } from './businessedit-routing.module';

import { BusinesseditPage } from './businessedit.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinesseditPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [BusinesseditPage],
})
export class BusinesseditPageModule {}
