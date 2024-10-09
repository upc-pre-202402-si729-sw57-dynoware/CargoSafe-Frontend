import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Output() locationSelected = new EventEmitter<any>();

  private marker?: L.Marker;

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const mapElement = document.getElementById("map") as HTMLElement;

    if (mapElement) {
      const map = L.map(mapElement).setView([-9.19, -75.0152], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      map.on('click',
        (event) => {
          const lat = event.latlng.lat;
          const lng = event.latlng.lng;


          this.locationSelected.emit({ lat, lng });
          this.addMarker(map, event.latlng);
        });
    } else {
      console.error("Map element not found.");
    }
  }

  addMarker(map: L.Map, location: L.LatLng) {
    if (this.marker) {
      map.removeLayer(this.marker);
    }
    this.marker = L.marker(location).addTo(map);
  }



}
