import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessregisterPage } from './businessregister.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessregisterPageRoutingModule {}
