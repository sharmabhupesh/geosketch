import { Component, OnInit,AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';

@Component({
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,AfterViewInit {
    
  map: Map;

  constructor(){

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://localhost:8082/geoserver/wms',
          params: {'LAYERS': 'geosketch:Village_Bond', 'TILED': true},
          serverType: 'geoserver',
          // Countries have transparency, so do not fade tiles:
          transition: 0,
        }),
      }),
    ];

    this.map = new Map({
        layers:layers,
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
