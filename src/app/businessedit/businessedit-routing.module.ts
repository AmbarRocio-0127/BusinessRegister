import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinesseditPage } from './businessedit.page';

const routes: Routes = [
  {
    path: '',
    component: BusinesseditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinesseditPageRoutingModule {}
