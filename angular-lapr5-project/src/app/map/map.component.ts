import { Component, OnInit } from '@angular/core';
import { GeoCoordinates } from '@here/harp-geoutils';
import { OmvTileDecoder } from "@here/harp-omv-datasource/index-worker";
import { MapAnchor, MapView } from "@here/harp-mapview";
import { APIFormat, AuthenticationMethod, OmvDataSource } from "@here/harp-omv-datasource";
import { MapControls } from '@here/harp-map-controls';
import * as THREE from 'three';
import { NodeService } from '../services/node.service';
import { INode } from '../interfaces/INode';
import { LineService } from '../services/line.service';
import { ILine } from '../interfaces/ILine';
import { ILinePath } from '../interfaces/ILinePath';
import { PathService } from '../services/path.service';
import { IPath } from '../interfaces/IPath';
import { Scene } from 'three';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  nodes: any[] = [];
  lines: any[] = [];
  linePath: any[] = [];
  paths: any[] = [];
  mapView: MapView;
  mapControls: MapControls;
  constructor(private nodeService: NodeService, private lineService: LineService, private pathService: PathService) {

  }

  ngOnInit() {
    this.createMap();
  }

  createMap() {
    const canvas = document.getElementById('map') as HTMLCanvasElement;
    this.mapView = new MapView({
      canvas,
      theme:
        'https://unpkg.com/@here/harp-map-theme/resources/berlin_tilezen_base.json',
      maxVisibleDataSourceTiles: 40,
      tileCacheSize: 100
    });

    this.mapControls = new MapControls(this.mapView);
    this.mapControls.tiltEnabled = false;

    const startLocation = new GeoCoordinates(41.187208, -8.375702);
    this.mapView.lookAt({ target: startLocation, zoomLevel: 11.5 });

    this.mapView.resize(window.innerWidth - 60, window.innerHeight - 150);
    window.addEventListener('resize', () => {
      this.mapView.resize(window.innerWidth - 60, window.innerHeight - 150);
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
    this.nodeService.getNodes().subscribe(node => {
      this.nodes = node;
      console.log(this.nodes);
      for (let i = 0; i < this.nodes.length; i++) {
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

    this.lineService.getLines().subscribe(line => {
      this.lines = line;

      for (let i = 0; i < this.lines.length; i++) {
        var pathLine: any;
        if (this.lines[i].linePaths != undefined) {
          pathLine = this.lines[i].linePaths[0].linePath;
        }

        this.pathService.getPaths().subscribe(path => {
          this.paths = path;
          var nodePath: any;
          if (this.paths[i].pathNodes != undefined) {
            nodePath = this.paths[i].pathNodes[0].pathNode;
          }

          for (let j = 0; j < nodePath.length; j++) {
            this.nodeService.getNodes().subscribe(node => {
              this.nodes = node;

              var nodesToLine:any[]=[];
              const material = new THREE.LineBasicMaterial({color:line[i].color.toLowerCase()});
              const geometry=new THREE.Geometry();

              for (let k = 0; k < this.nodes.length; k++) {
                if (nodePath[j].node == this.nodes[k].key) {
                  nodesToLine.push(node[k]);
                }
              }
              
              for (let k = 0; k < nodesToLine.length; k++) {
                var lat=nodesToLine[k].latitude;
                var long=nodesToLine[k].longitude;
                geometry.vertices.push(lat,long);
              }

              
              var lineToDraw = new THREE.Line(geometry,material);
              this.mapView.scene.add(lineToDraw);
              this.mapView.renderer.render(this.mapView.scene,this.mapView.camera);
            });
          }

        });
      }
    });
  }


  createPoint(): MapAnchor<THREE.Object3D> {
    const cube = new THREE.Object3D();
    const geometry = new THREE.CircleGeometry(350, 30);
    const material = new THREE.MeshStandardMaterial({ color: "rgb(255,0,0)" });
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
