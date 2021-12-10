import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ToastController, LoadingController, NavController, Platform} from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FirestoreService } from '../services/firestore.service';
import { Negocio } from '../models/negocio.mode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  neg: Negocio [] = [];
  posts: any;
  subscription: any;
  
  newNegocio: Negocio = {
    id: this.firestoreServices.getId(),
    nombre_: '',
    tipo_: '',
    foto_: '',
    telefono_: '',
    direccion_: '',
    latitud_: 0,
    longitud_: 0,
  }
 
  ngOnInit(){}

  arrayColeccionNegocio: any = [{
    id: this.newNegocio,
    data: {} as Negocio
   }];

  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    public firestoreServices: FirestoreService) {
      this.obtenerListaNegocios();
    }

   async obtenerListaNegocios(){
      let loader = await this.loadingCtrl.create({
        message: "Por favor espere..."
      });
      loader.present();

      this.firestoreServices.consultar("NegocioReg").subscribe((resultadoConsultaNegocio) => {
        this.arrayColeccionNegocio = [];
        resultadoConsultaNegocio.forEach((datosNegocio: any) => {
          this.arrayColeccionNegocio.push({
            id: datosNegocio.payload.doc.id,
            data: datosNegocio.payload.doc.data()
          });
        })
      });
       // dismiss loader
       loader.dismiss();
    }

    async deletNegocio(id: string) {
      id = this.newNegocio.id
      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Por favor, espere..."
      });
      loader.present();
  
      await this.firestore.doc("NegocioReg/" + id).delete();
  
      // dismiss loader
      loader.dismiss();
    }

    private path = 'Negocio/';

    ionViewWillEnter() {
      this.getNegocios();
    }

  getNegocios(){
    this.firestoreServices.getCollection<Negocio>(this.path).subscribe( res => {
      this.neg = res;
    });
  }


  showToast(message: string){
    this.toastCtrl
    .create({
      message: message,
      duration: 3000
    }).then(toastData =>toastData.present());
  }

}
