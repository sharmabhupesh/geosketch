import { Component, OnInit,AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,AfterViewInit {
    
    map: Map;

    constructor(){
        this.map = new Map({
            layers: [
              new TileLayer({
                source: new OSM()
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 2
            })
          });
    }
    
    ngOnInit(): void {
        
    }

    ngAfterViewInit() {
        this.map.setTarget("map");
    }

}
