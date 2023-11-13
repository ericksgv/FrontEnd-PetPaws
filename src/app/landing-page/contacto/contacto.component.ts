import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {} from 'googlemaps';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements AfterViewInit{

  @ViewChild('map') mapElement: any
  map: google.maps.Map | undefined
  marker: google.maps.Marker | undefined

  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(4.628944, -74.06485),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    // Add a marker to the map
    this.marker = new google.maps.Marker({
      position: { lat: 4.628944, lng: -74.06485 },
      map: this.map,
      title: 'Cede central petPaws',// Add a title if you want
    });
  }

}
