import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  ToastController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';

import { Negocio } from '../models/negocio.mode';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  business: Negocio[];

  constructor(
    private businessService: BusinessService,
    private nav: NavController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();
    this.businessService.getBusiness().subscribe((res) => {
      this.loadingCtrl.dismiss();
      this.business = res;
    });
  }

  update(id: string) {
    console.log(id);
    this.nav.navigateRoot('/tabs/update/' + id);
  }
  async delete(id: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando...',
    });
    await loading.present();
    this.businessService.deleteBussine(id).then(() => {
      loading.dismiss();
      this.nav.navigateRoot('');
    });
  }
}
