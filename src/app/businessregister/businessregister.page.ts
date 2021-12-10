import { Component, OnInit } from '@angular/core';
import { Negocio } from '../models/negocio.mode';
import {
  ToastController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
declare var window: any;

import { decode } from 'base64-arraybuffer';

@Component({
  selector: 'app-businessregister',
  templateUrl: './businessregister.page.html',
  styleUrls: ['./businessregister.page.scss'],
})
export class BusinessregisterPage implements OnInit {
  negocio = {} as Negocio;
  tempImages: string[] = [];
  base64Image: string;
  image: string;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private camera: Camera
  ) {}

  ngOnInit() {}

  async register(negocio: Negocio) {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: 'espere por favor...',
      });
      loader.present();
      // dismis loader
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.negocio.nombre_) {
      this.showToast('Introduzca el nombre del negocio');
      return false;
    }

    if (!this.negocio.tipo_) {
      this.showToast('Introduzca el tipo del negocio');
      return false;
    }

    if (!this.negocio.direccion_) {
      this.showToast('Introduzca la dirección del negocio');
      return false;
    }

    if (!this.negocio.telefono_) {
      this.showToast('Introduzca el telefono del negocio');
      return false;
    }

    if (!this.negocio.latitud_) {
      this.showToast('Introduzca la latitud del negocio');
      return false;
    }

    if (!this.negocio.longitud_) {
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
        // Esta variable se usa para mostrar la imagen en el html.
        this.base64Image = 'data:image/jpeg;base64,' + imageData;

        // Esta es la que se usara para subirla al servicio.
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

    //Pesta es la variable que tiene la url de la imagen
    console.log(
      'URL DE LA IMAGEN YA SUBIDA: ' + JSON.stringify(datos.data.url)
    );
  }
}
