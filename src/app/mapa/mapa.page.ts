import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { Negocio } from '../models/negocio.mode';

import { BusinessService } from '../services/business.service';
import { element } from 'protractor';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {
  public business: Negocio[];

  constructor(private businessService: BusinessService) {}
  async ngOnInit() {
    await this.businessService.getBusiness().subscribe((res) => {
      this.business = res;
      mapboxgl.accessToken =
        'pk.eyJ1IjoicmFubmQyMyIsImEiOiJja3d3OHlidzQwMWQ3Mm9xdmpyODFmaGF4In0.eEwCsb4-3ZoxFTrJTpTF3Q';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.162651, 18.735693],
        zoom: 7,
      });
      map.on('load', function () {
        map.resize();
      });

      this.business.forEach((negocio) => {
        let popup = new mapboxgl.Popup()
          .setLngLat([negocio.longitud, negocio.latitud])
          .setHTML(
            `<h1 style="color:black;">${negocio.nombre}</h1> ` +
              `<p style="color:black;">${negocio.tipo}</p>` +
              `<p style="color:black;">${negocio.telefono}</p>`
          );
        const marker = new mapboxgl.Marker()
          .setLngLat([negocio.longitud, negocio.latitud])
          .setPopup(popup)
          .addTo(map);
      });
    });
  }

  ngAfterViewInit(): void {}
}
