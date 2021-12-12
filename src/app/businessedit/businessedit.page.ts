import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { LoadingController, NavController } from '@ionic/angular';
import { Negocio } from '../models/negocio.mode';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-businessedit',
  templateUrl: './businessedit.page.html',
  styleUrls: ['./businessedit.page.scss'],
})
export class BusinesseditPage implements OnInit {
  businessId: null;
  image: null;
  base64Image: string;
  negocio: Negocio = {
    nombre: '',
    tipo: '',
    foto: '',
    telefono: '',
    direccion: '',
    latitud: 0,
    longitud: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private businessService: BusinessService,
    private navCtrl: NavController,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.businessId = this.route.snapshot.params['id'];
    if (this.businessId != null) {
      this.loadBusiness();
    }
  }

  async update(id: string) {
    if (this.businessId) {
      if (this.image) {
        await this.postImage(this.image);
      }
      const loading = await this.loadingCtrl.create({
        message: 'Actualizando...',
      });
      await loading.present();

      this.businessService
        .updateBussine(this.negocio, this.businessId)
        .then(() => {
          loading.dismiss();
          this.clearInputs();
          this.navCtrl.navigateRoot('');
        });
    }
  }

  async loadBusiness() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();

    await this.businessService.getBussine(this.businessId).subscribe((res) => {
      loading.dismiss();
      this.negocio = res;
      this.base64Image = this.negocio.foto;
    });
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
}
