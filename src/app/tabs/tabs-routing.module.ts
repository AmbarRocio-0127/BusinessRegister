import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'registro',
        loadChildren: () =>
          import('../businessregister/businessregister.module').then(
            (m) => m.BusinessregisterPageModule
          ),
      },
      {
        path: 'update/:id',
        loadChildren: () =>
          import('../businessedit/businessedit.module').then(
            (m) => m.BusinesseditPageModule
          ),
      },
      {
        path: 'mapa',
        loadChildren: () =>
          import('../mapa/mapa.module').then((m) => m.MapaPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
