import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdatosPageRoutingModule } from './editdatos-routing.module';

import { EditdatosPage } from './editdatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdatosPageRoutingModule
  ],
  declarations: [EditdatosPage]
})
export class EditdatosPageModule {}
