import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
// import { FirestoreService } from '../services/firestore.service';

import { Negocio } from '../models/negocio.mode';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-businessregister',
  templateUrl: './businessregister.page.html',
  styleUrls: ['./businessregister.page.scss'],
})
export class BusinessregisterPage {
  negocio: Negocio = {
    nombre: '',
    tipo: '',
    foto: '',
    telefono: '',
    direccion: '',
    latitud: null,
    longitud: null,
  };
  businessId = null;

  base64Image: string;
  image: null;

  constructor(
    private toastCtrl: ToastController,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private businessService: BusinessService
  ) {}

  async save() {
    if (this.formValidation) {
      await this.postImage(this.image);
      const loading = await this.loadingCtrl.create({
        message: 'Guardando...',
      });
      await loading.present();

      await this.businessService.addBussine(this.negocio).then(() => {
        loading.dismiss();
        this.clearInputs();
        this.navCtrl.navigateRoot('');
      });
    }
  }

  clearInputs() {
    this.negocio.nombre = '';
    this.negocio.direccion = '';
    this.negocio.latitud = 0;
    this.negocio.longitud = 0;
    this.negocio.foto = '';
    this.negocio.telefono = '';
    this.negocio.tipo = '';
    this.businessId = null;
    this.image = null;
    this.base64Image = null;
  }

  formValidation() {
    if (!this.negocio.nombre) {
      this.showToast('Introduzca el nombre del negocio');
      return false;
    }

    if (!this.negocio.tipo) {
      this.showToast('Introduzca el tipo del negocio');
      return false;
    }

    if (!this.negocio.direccion) {
      this.showToast('Introduzca la dirección del negocio');
      return false;
    }

    if (!this.negocio.telefono) {
      this.showToast('Introduzca el telefono del negocio');
      return false;
    }

    if (!this.negocio.latitud) {
      this.showToast('Introduzca la latitud del negocio');
      return false;
    }

    if (!this.negocio.longitud) {
      this.showToast('Introduzca la longitud del negocio');
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.procesarImagen(options);
  }

  galeria() {
    const options: CameraOptions = {
      quality: 100,

      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;

        this.image = imageData;
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  async postImage(image) {
    const api =
      'https://api.imgbb.com/1/upload?expiration=2592000&key=de474256da0e5a91b00c47430ac5aede';

    const data = new FormData();
    data.append('image', image);

    var init = {
      method: 'POST',
      body: data,
    };

    const respuesta = await fetch(api, init);
    const datos = await respuesta.json();

    this.negocio.foto = datos.data.url;
  }
}
