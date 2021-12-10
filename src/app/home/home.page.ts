import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ToastController, LoadingController, Platform } from "@ionic/angular";
import {} from "../models/negocio.mode"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts: any;
  subscription: any;


  constructor( private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform) {}

    ionViewDidEnter() {
      this.subscription = this.platform.backButton.subscribe(() => {
        navigator[''].exitApp();
      });
    }

    ngOnInit() {
    
    }

    ionViewWillLeave() {
      this.subscription.unsubscribe();
    }
  
    ionViewWillEnter() {
   
   }
    
    
    showToast(message: string) {
      this.toastCtrl
        .create({
          message: message,
          duration: 3000
        })
        .then(toastData => toastData.present());
    }

}
