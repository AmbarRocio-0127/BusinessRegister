import { Component, OnInit } from '@angular/core';
import {Negocio} from '../models/negocio.mode';
import { ToastController, LoadingController, NavController, Platform} from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-businessregister',
  templateUrl: './businessregister.page.html',
  styleUrls: ['./businessregister.page.scss'],
})
export class BusinessregisterPage implements OnInit {
  negocio = {} as Negocio;
  
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController) {}

  ngOnInit() {
  }


  async register(negocio:Negocio){
   if(this.formValidation()){
    let loader = await this.loadingCtrl.create({
      message: "espere por favor..."
    });
    loader.present();

    // dismis loader
    loader.dismiss();

   }
  }

  formValidation(){
    if(!this.negocio.nombre_){
      this.showToast("Introduzca el nombre del negocio");
      return false;
    }

    if(!this.negocio.tipo_){
      this.showToast("Introduzca el tipo del negocio");
      return false;
    }

    if(!this.negocio.direccion_){
      this.showToast("Introduzca la dirección del negocio");
      return false;
    }

    if(!this.negocio.telefono_){
      this.showToast("Introduzca el telefono del negocio");
      return false;
    }

    if(!this.negocio.latitud_){
      this.showToast("Introduzca la latitud del negocio");
      return false;
    }

    if(!this.negocio.longitud_){
      this.showToast("Introduzca la longitud del negocio");
      return false;
    }

    return true;
  }

  showToast(message: string){
    this.toastCtrl
    .create({
      message: message,
      duration: 3000
    }).then(toastData =>toastData.present());
  }
}
