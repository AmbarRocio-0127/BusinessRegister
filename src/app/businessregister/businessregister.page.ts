import { Component, OnInit } from '@angular/core';
import {Negocio} from '../models/negocio.mode';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ToastController, LoadingController, NavController, Platform} from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-businessregister',
  templateUrl: './businessregister.page.html',
  styleUrls: ['./businessregister.page.scss'],
})
export class BusinessregisterPage implements OnInit {
  negocio = {} as Negocio;
  posts: any;
  subscription: any;
  
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore) {}

  ngOnInit() {
  }


  async register(negocio: Negocio){
   if(this.formValidation()){
   
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
      await this.firestore.collection("NegocioReg").add(negocio);
    } catch (e) {
      this.showToast(e);
    }

    // dismiss loader
    loader.dismiss();

    // redirect to home page
    this.navCtrl.navigateRoot('');

   }
  }

  async getPosts() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere..."
    });
    loader.present();

    try {
      this.firestore
        .collection("NegocioReg").snapshotChanges().subscribe(data => { this.posts = data.map(e => {
            return {
              id: e.payload.doc.id,
              nombre_: e.payload.doc.data()["nombre_"],
              tipo_: e.payload.doc.data()["tipo_"],
              telefono_: e.payload.doc.data()["telefono_"],
              direccion_: e.payload.doc.data()["direccion_"],
              foto_: e.payload.doc.data()["foto_"],
              latitud_: e.payload.doc.data()["latitud_"],
              longitud_: e.payload.doc.data()["longitud_"]
            };
          });

          // dismiss loader
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  async deleteNegocio(id: string) {
    // console.log(id);

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere..."
    });
    loader.present();

    await this.firestore.doc("NegocioReg/" + id).delete();

    // dismiss loader
    loader.dismiss();
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
