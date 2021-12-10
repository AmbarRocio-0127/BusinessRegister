import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdatosPage } from './editdatos.page';

const routes: Routes = [
  {
    path: '',
    component: EditdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdatosPageRoutingModule {}
