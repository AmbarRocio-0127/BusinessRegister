import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {
    /* Aqui se puede recibir un array de negocios,
     para iterrarlo y obtener la lat y lng de cada uno*/
  }

  ngAfterViewInit() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoicmFubmQyMyIsImEiOiJja3d3OHlidzQwMWQ3Mm9xdmpyODFmaGF4In0.eEwCsb4-3ZoxFTrJTpTF3Q';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-69.929611, 18.483402],
      zoom: 12,
    });

    map.on('load', function () {
      map.resize();
      let popup = new mapboxgl.Popup()
        .setLngLat([-69.929611, 18.483402])
        .setHTML(
          '<h1 style="color:black;">Negocio</h1>' +
            '<p style="color:black;">Tipo de negocio</p>' +
            '<p style="color:black;">Numero de telefono</p>'
        );

      const marker = new mapboxgl.Marker()
        .setLngLat([-69.929611, 18.483402])
        .setPopup(popup)
        .addTo(map);
    });
  }
}
