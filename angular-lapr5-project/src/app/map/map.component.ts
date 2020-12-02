import { Component, OnInit } from '@angular/core';
import { GeoCoordinates } from '@here/harp-geoutils';
import { OmvTileDecoder } from "@here/harp-omv-datasource/index-worker";
import { MapAnchor, MapView } from "@here/harp-mapview";
import { APIFormat, AuthenticationMethod, OmvDataSource } from "@here/harp-omv-datasource";
import { MapControls } from '@here/harp-map-controls';
import * as THREE from 'three';
import { NodeService } from '../services/node.service';
import { INode } from '../interfaces/INode';
import { RGBADepthPacking } from 'three';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  nodes: INode[] = [];
  mapView: MapView;
  mapControls: MapControls;
  constructor(private service: NodeService) {
    
  }

  ngOnInit() {
    this.createMap();
  }

  createMap(){
    const canvas = document.getElementById('map') as HTMLCanvasElement;
    this.mapView = new MapView({
      canvas,
      theme:
        'https://unpkg.com/@here/harp-map-theme/resources/berlin_tilezen_base.json',
      maxVisibleDataSourceTiles: 40,
      tileCacheSize: 100
    });

    this.mapControls = new MapControls(this.mapView);

    const startLocation = new GeoCoordinates(41.187208, -8.375702);
    this.mapView.lookAt({ target: startLocation, zoomLevel: 11.5 });

    this.mapView.resize(window.innerWidth-60, window.innerHeight-150);
    window.addEventListener('resize', () => {
      this.mapView.resize(window.innerWidth-60, window.innerHeight-150);
    });

    const omvDataSource = new OmvDataSource({
      apiFormat: APIFormat.XYZOMV,
      styleSetName: "tilezen",
  
      baseUrl: "https://vector.hereapi.com/v2/vectortiles/base/mc",
      authenticationCode: "tG0O7q7DN0IW9BjSznkxfInoA_EjFKr8Sxx4m8TEPEs",
      authenticationMethod: {
          method: AuthenticationMethod.QueryString,
          name: "apikey"
      },
      decoder: new OmvTileDecoder()
    });
  
    this.mapView.addDataSource(omvDataSource);
    this.service.getNodes().subscribe(node => {
      this.nodes = node;
      console.log(this.nodes);
      for(let i = 0; i< this.nodes.length; i++) {
        const geoPosition = new GeoCoordinates(this.nodes[i].latitude, this.nodes[i].longitude);
        if (geoPosition === null) {
            return;
        }
        
        const cube = this.createPoint();
        cube.anchor = geoPosition;
        this.mapView.mapAnchors.add(cube);
        this.mapView.update();
      }
    });
  }

  createPoint(): MapAnchor<THREE.Object3D>{
    const cube = new THREE.Object3D();
    const geometry = new THREE.CircleGeometry(350, 30);
    const material = new THREE.MeshStandardMaterial({ color: "rgb(255,0,0)"});
    const prePassMaterial = new THREE.MeshStandardMaterial({
      color: "rgb(255,0,0)",
      opacity: 0.3,
      depthTest: false,
      transparent: true
    });
    const prePassMesh = new THREE.Mesh(geometry, prePassMaterial);
    prePassMesh.renderOrder = Number.MAX_SAFE_INTEGER - 1;
    cube.add(prePassMesh);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = Number.MAX_SAFE_INTEGER;
    cube.add(mesh);
    return cube;
  }
  
}
