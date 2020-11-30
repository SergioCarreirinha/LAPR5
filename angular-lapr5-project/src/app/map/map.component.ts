import { Component, OnInit } from '@angular/core';
import * as THREE from  'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { ILine } from '../interfaces/ILine';
import { INode } from '../interfaces/INode';
import { IPath } from '../interfaces/IPath';
import { LineService } from '../services/line.service';
import { NodeService } from '../services/node.service';
import { PathService } from '../services/path.service';

declare var Mappa: any;
declare var harp: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  private map: any;
  private mapControls: any;

  public constructor(private nodeServ: NodeService, private lineServ: LineService, private pathServ: PathService) { }

  public ngOnInit() { }

  public ngAfterViewInit() {
    this.createMap();
  }

  createMap(){
    const canvas = document.getElementById("map") as HTMLCanvasElement;
    this.map = new harp.MapView({
      canvas: canvas,
      theme: "https://unpkg.com/@here/harp-map-theme@0.3.3/resources/berlin_tilezen_base.json",
    });

    const omvDataSource = new harp.OmvDataSource({
      authenticationCode: "tG0O7q7DN0IW9BjSznkxfInoA_EjFKr8Sxx4m8TEPEs",
    });
    
    this.map.setCameraGeolocationAndZoom(new harp.GeoCoordinates(Number(41.14961), Number(-8.61099)), 15);
    this.mapControls = new harp.MapControls(this.map, );
    this.mapControls.enabled = true;
    this.map.addDataSource(omvDataSource);
    
  }
}
