import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { NodeService } from '../services/node/node.service';
import { LineService } from '../services/line/line.service';
import { PathService } from '../services/path/path.service';
import { environment } from 'src/environments/environment';
import * as THREEBOX from './threebox-master/src/Threebox';
import * as THREE from './threebox-master/src/three';
import { Light } from './threebox-master/src/three';


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
  toggle = false;
  coords: any[] = [];

  linesAdded: any[][] = [];
  lineRepetitions: number[] = [];

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 41.187208;
  lng = -8.3757027;
  constructor(private nodeService: NodeService, private lineService: LineService, private pathService: PathService) {
  }

  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accesstoken);
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new PitchToggle({ minpitchzoom: 10 },this.nodeService,this.map), 'top-left');

    this.setArrayPaths();
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.dragRotate.disable();

    this.drawNodesAndLines();
    //this.addLight();

  }

  addLight() {
    let tb: THREEBOX;
    const light = new tb.Light(0xff0000, 1, 100);
    light.position.set(-8.3757027, 41.187208, 1);
    tb.add(light);
  }


  drawNodesAndLines() {
    this.nodeService.getNodes().subscribe(node => {
      this.nodes = node;

      let tb: THREEBOX;
      let map = this.map;
      let nodesIn = this.nodes;


      map.on('load', function () {
        map.addLayer({
          id: 'custom_layer1',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function (map, mbxContext) {

            tb = new THREEBOX(
              map,
              mbxContext,
              { realSunlight: true,
                enableSelectingObjects: true, //enable 3D models over/selection
                enableTooltips: true // enable default tooltips on fill-extrusion and 3D models
              }
            );

            let longitudeAdjustment = 0.001;
            let latitudeAdjustment = 0.0007;
            let pointColor = 0xff0000;
            for (var i = 0; i < nodesIn.length; i++) {

              const material = new THREE.MeshBasicMaterial({ color: pointColor });
              material.transparent = true;
              let geo = new THREE.CircleGeometry(3, 32);
              var nodes = new THREE.Mesh(geo, material);

              nodes = tb.Object3D({ obj: nodes })
                .setCoords([nodesIn[i].longitude - longitudeAdjustment, nodesIn[i].latitude - latitudeAdjustment, 0.00001]);
              tb.add(nodes);
            }
          },
          render: function (gl, matrix) {
            tb.update();
          }

        });

      }); this.drawLines();

    });

    // this.nodeService.getNodes().subscribe(node => {
    //   this.nodes = node;
    //   for (var i = 0; i < this.nodes.length; i++) {

    //     new mapboxgl.Marker({ color: 'red', scale: 1 }).setLngLat([this.nodes[i].longitude, this.nodes[i].latitude]).setPopup(
    //       new mapboxgl.Popup({ offset: 25 }).setText(
    //         this.nodes[i].key + ' name:' +
    //         this.nodes[i].name +
    //         ' Lat: ' +
    //         this.nodes[i].latitude +
    //         '   Lon: ' +
    //         this.nodes[i].longitude,
    //       ),
    //     ).addTo(this.map);

    //   }
    // })
  }

  setArrayLines() {
    this.lineService.getLines().subscribe(lines => {
      this.lines = lines;
    });
  }

  setArrayPaths() {
    this.pathService.getPaths().subscribe(paths => {
      this.paths = paths;
    });
  }

  setArrayNodes() {
    this.nodeService.getNodes().subscribe(node => {
      this.nodes = node;
    });
  }
  async drawLines() {
    this.lineService.getLines().subscribe(lines => {
      this.lines = lines;
      for (let i = 0; i < this.lines.length; i++) {
        var coords: any[] = [];
        for (let h = 0; h < this.lines[i].linePaths.length; h++) {
          let contador = 0;
          var pathLine: any[] = [];
          if (this.lines[i].linePaths[h].linePath != undefined) {
            pathLine = this.lines[i].linePaths[0].linePath;
          } else {
            pathLine.push(this.lines[i].linePaths[h].props);
          }
          if (pathLine.length == undefined) {
            contador = 1;
          }
          else {
            contador = pathLine.length;
          }
          for (let z = 0; z < contador; z++) {
            var nodePath: any[] = [];
            for (let pa = 0; pa < this.paths.length; pa++) {
              if (pathLine[z].path == this.paths[pa].key) {
                if (this.paths[pa].pathNodes[0].pathNode != undefined) {
                  nodePath = this.paths[pa].pathNodes[0].pathNode;
                } else {
                  for (let jpa = 0; jpa < this.paths[pa].pathNodes.length; jpa++) {
                    nodePath.push(this.paths[pa].pathNodes[jpa].props);
                  }
                }
              }
            }
            if (pathLine[z].orientation == "Go") {
              for (let j = 0; j < nodePath.length; j++) {
                var nodesToLine: any[] = [];
                for (let k = 0; k < this.nodes.length; k++) {
                  if (nodePath[j].node == this.nodes[k].key) {
                    if (!nodePath.includes(this.nodes[k].key)) nodesToLine.push(this.nodes[k]);
                  }
                }
                for (let k = 0; k < nodesToLine.length; k++) {
                  var lat = nodesToLine[k].latitude;
                  var long = nodesToLine[k].longitude;
                  coords.push([long, lat]);
                }
              }
            }
          }
        }
        let newCoords = this.lineOverlap(coords);
        if (coords.length > 0) {
          this.drawLine(newCoords, this.lines[i].name, this.rgbToHex(this.lines[i].color));
        }
        coords = [];
      }
    });
  }

  checkIfLineIsAdded(coord: number[]): number {
    let coordRev = [coord[2], coord[3], coord[0], coord[1]];

    for(let j=0; j<this.linesAdded.length; j++){
      if(JSON.stringify(this.linesAdded[j])==JSON.stringify(coord) ||
      JSON.stringify(this.linesAdded[j])==JSON.stringify(coordRev)){
        return j;
      }
    }
    return -1;
  }

  lineOverlap(coords: any[]) {
    let newCoords: number[][]=[];
    for (let i = 1; i < coords.length; i++) {

      let coord = [coords[i - 1][0], coords[i - 1][1], coords[i][0], coords[i][1]];

      let index = this.checkIfLineIsAdded(coord);
      if (index<0) {
        this.linesAdded.push(coord);
        this.lineRepetitions.push(1);

        newCoords.push([coords[i - 1][0], coords[i - 1][1]]);
        newCoords.push([coords[i][0], coords[i][1]]);
      } else {                  //x1        y1       x2        y2
        let r = this.lineLength(coord[0], coord[1], coord[2], coord[3]);

        let cosBeta = -(coord[3] - coord[1]) / r;
        let sinBeta = (coord[2] - coord[0]) / r;
        //distancia entre linhas
        let d = Math.round(this.lineRepetitions[index]/2) * 0.00015;

        let lat1, long1, lat2, long2;

        if (this.lineRepetitions[index] % 2 == 0) {
          long1 = (coord[0]) + d * cosBeta;
          lat1 = (coord[1]) + d * sinBeta;
 
          long2 = (coord[2]) + d * cosBeta;
          lat2 = (coord[3]) + d * sinBeta;

        } else {
          long1 = (coord[0]) - d * cosBeta;
          lat1 = (coord[1]) - d * sinBeta;

          long2 = (coord[2]) - d * cosBeta;
          lat2 = (coord[3]) - d * sinBeta;

        }

        newCoords.push([long1,lat1]);
        newCoords.push([long2,lat2])

        this.lineRepetitions[index] += 1;
      }
    }
    return newCoords;
  }

  lineLength(x1: number, y1: number, x2: number, y2: number): number {
    let x = x2-x1;
    let y = y2-y1;
    return (
      Math.sqrt(
                Math.pow(x, 2) +
                Math.pow(y, 2)
                )
    );
  }

  drawLine(coord: Array<any>, name: string, color: string) {
    let tb: THREEBOX;
    this.map.addLayer({
      id: name,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, mbxContext) {

        tb = new THREEBOX(
          map,
          mbxContext,
          { defaultLights: true }
        );
        var lineOptions = {
          geometry: coord,
          color: color, // color based on latitude of endpoint
          width: 3
        }

        let lineMesh = tb.line(lineOptions);

        tb.add(lineMesh)
      },
      render: function (gl, matrix) {
        tb.update();
      }

    });

  }

  /* this.map.addSource(name, {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coord,
      },
    },
  });
  this.map.addLayer({
    id: name,
    type: 'line',
    source: name,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': color,
      'line-width': 3,
    },
  }); */


  rgbToHex(st: string) {
    var r = st.split(",");
    var red = parseInt(r[0].replace('RGB(', ''));
    var green = parseInt(r[1]);
    var blue = parseInt(r[2].replace(')', ''));

    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
  }

}

//retirado de https://codepen.io/roblabs/pen/zJjPzX
class PitchToggle {

  _pitch: number;
  _minpitchzoom: any;
  _map: any;
  _btn: HTMLButtonElement;
  _container: HTMLDivElement;
  _bearing: number;
  
  nodes: any[]=[];
  
  constructor({ bearing = -20, pitch = 70, minpitchzoom = null, },private nodeService: NodeService, private map:mapboxgl.Map) {
    this._bearing = bearing;
    this._pitch = pitch;
    this._minpitchzoom = minpitchzoom;
  }

  drawModels() {

    this.nodeService.getNodes().subscribe(node => {
      this.nodes = node;

      let tb: THREEBOX;
      let map = this.map;
      let nodesIn = this.nodes;

      map.addLayer({
        id: 'custom_layer2',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, mbxContext) {

          tb = new THREEBOX(
            map,
            mbxContext,
            { defaultLights: true }
          );

          for (let point of nodesIn) {
            var model;
            if(point.isDepot === "true"){
              model = {
                type: 'gltf',
                obj: '../../assets/3DModel/Depot_Point.gltf',
                scale: 0.015,
                rotation: { x: 90, y: 90, z: 0 },
              }
            } else if(point.isReliefPoint === "true"){
              model = {
                type: 'gltf',
                obj: '../../assets/3DModel/Relief_Point.gltf',
                scale: 0.015,
                rotation: { x: 90, y: 180, z: 0 },
              }
            } else {
              model = {
                type: 'gltf',
                obj: '../../assets/3DModel/Bus_Stop.gltf',
                scale: 0.01,
                rotation: { x: 90, y: 180, z: 0 },
              }
            }
            let locatedModel;
            tb.loadObj(model, function (model) {

              locatedModel = model.setCoords([point.longitude - 0.00025, point.latitude, 0]);
              tb.add(locatedModel);
            });
          }
        },
        render: function (gl, matrix) {
          tb.update();
        }

      });
    });

  }

  onAdd(map) {
    this._map = map;
    let _this = this;
    let toggle = false;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
    this._btn.type = "button";
    this._btn.textContent = "3D";
    this._btn.onclick = function () {

      if (map.getPitch() === 0) {
        let options = { pitch: _this._pitch, bearing: _this._bearing };
        map.easeTo(options);
        _this._btn.className =
          "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-2d";
      } else {
        map.easeTo({ pitch: 0, bearing: 0 });
        _this._btn.className =
          "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
      }

      //retirado de https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/
      if (!toggle) {
        _this._btn.textContent = "2D";
        toggle = true;
        map.dragRotate.enable();
        _this.drawModels();

        map.addLayer(
          {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',

              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          },
        );
      }
      else {
        _this._btn.textContent = "3D";
        map.removeLayer('3d-buildings');
        map.removeLayer('custom_layer2');
        map.dragRotate.disable();
        toggle = false;
      }
    };

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
