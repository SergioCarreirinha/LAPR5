import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { NodeService } from '../services/node/node.service';
import { LineService } from '../services/line/line.service';
import { PathService } from '../services/path/path.service';
import { environment } from 'src/environments/environment';
import * as THREEBOX from './threebox-master/src/Threebox';
import * as THREE from './threebox-master/src/three';
import * as dat from 'dat-gui';
import { FirstPersonControls } from './threebox-master/src/firstpersoncontrols';
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

    this.map.addControl(new PitchToggle({ minpitchzoom: 10 }, this.nodeService, this.map), 'top-left');

    this.setArrayPaths();
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.dragRotate.disable();

    this.drawNodesAndLines();
    //this.addLight();
    this.addNodeTooltips();
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
              {
                defaultLights: true
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
  }

  //retirado de https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
  addNodeTooltips() {
    let _this = this;

    _this.map.on('load', function () {
      _this.map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',

        function (error, image) {
          if (error) throw error;
          _this.map.addImage('custom-marker', image);
        }
      );

      _this.nodeService.getNodes().subscribe(nodes => {

        for (let node of nodes) {
          _this.map.addSource(node.key, {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'properties': {
                    'description':
                      '<strong>' + node.name + '</strong>'
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [node.longitude + 0.0001, node.latitude + 0.0001]
                  }
                }
              ]
            }
          });

          _this.map.addLayer({
            'id': node.key,
            'type': 'symbol',
            'source': node.key,
            'layout': {
              'icon-image': 'custom-marker',
              'icon-allow-overlap': true
            }
          });

          var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
          });


          _this.map.on('mouseenter', node.key, function (e) {

            _this.map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;


            popup.setLngLat(coordinates).setHTML(description).addTo(_this.map);


          });

          _this.map.on('mouseleave', node.key, function () {
            _this.map.getCanvas().style.cursor = '';
            popup.remove();
          });
        }
      })

    });

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
          this.addLineTooltip(newCoords, this.lines[i].name, this.rgbToHex(this.lines[i].color));
        }
        coords = [];
      }
    });
  }

  addLineTooltip(coords: number[][], lineName: string, color: string) {
    let _this = this;

    this.map.on('load', function () {
      _this.map.addSource('tooltip ' + lineName, {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>' + lineName + '</strong>'
          },
          'geometry': {
            'type': 'LineString',
            'coordinates': coords
          }
        }
      });
      _this.map.addLayer({
        'id': 'tooltip ' + lineName,
        'type': 'line',
        'source': 'tooltip ' + lineName,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': 'rgba(0,0,225,0)',
          'line-width': 3
        }
      });

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      _this.map.on('mouseenter', 'tooltip ' + lineName, function (e) {

        _this.map.getCanvas().style.cursor = 'pointer';

        var description = e.features[0].properties.description;


        popup.setLngLat(e.lngLat).setHTML(description).addTo(_this.map);
      });

      _this.map.on('mouseleave', 'tooltip ' + lineName, function () {
        _this.map.getCanvas().style.cursor = '';
        popup.remove();

      });


    });
  }

  checkIfLineIsAdded(coord: number[]): number {
    let coordRev = [coord[2], coord[3], coord[0], coord[1]];

    for (let j = 0; j < this.linesAdded.length; j++) {
      if (JSON.stringify(this.linesAdded[j]) == JSON.stringify(coord) ||
        JSON.stringify(this.linesAdded[j]) == JSON.stringify(coordRev)) {
        return j;
      }
    }
    return -1;
  }

  lineOverlap(coords: any[]) {
    let newCoords: number[][] = [];
    for (let i = 1; i < coords.length; i++) {

      let coord = [coords[i - 1][0], coords[i - 1][1], coords[i][0], coords[i][1]];

      let index = this.checkIfLineIsAdded(coord);
      if (index < 0) {
        this.linesAdded.push(coord);
        this.lineRepetitions.push(1);

        newCoords.push([coords[i - 1][0], coords[i - 1][1]]);
        newCoords.push([coords[i][0], coords[i][1]]);
      } else {                  //x1        y1       x2        y2
        let r = this.lineLength(coord[0], coord[1], coord[2], coord[3]);

        let cosBeta = -(coord[3] - coord[1]) / r;
        let sinBeta = (coord[2] - coord[0]) / r;
        //distancia entre linhas
        let d = Math.round(this.lineRepetitions[index] / 2) * 0.00015;

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

        newCoords.push([long1, lat1]);
        newCoords.push([long2, lat2])

        this.lineRepetitions[index] += 1;
      }
    }
    return newCoords;
  }

  lineLength(x1: number, y1: number, x2: number, y2: number): number {
    let x = x2 - x1;
    let y = y2 - y1;
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

  nodes: any[] = [];

  constructor({ bearing = -20, pitch = 70, minpitchzoom = null, }, private nodeService: NodeService, private map: mapboxgl.Map) {
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
            {
              enableShadows: true,
              FirstPersonControls: true
            }
          );

          var directionalLight = new THREE.DirectionalLight(0xffffff);
          directionalLight.position.set(0, -70, 100).normalize();
          tb.add(directionalLight);
          tb.add(directionalLight.target);

          const light = new THREE.AmbientLight(0x666666);
          tb.add(light);

          const datGui = new dat.GUI({ autoPlace: true });
          const container = document.getElementById('guiDIV');
          container.appendChild(datGui.domElement);
          datGui.add(directionalLight, 'intensity', 0, 2, 0.01);
          datGui.add(directionalLight.target.position, 'x', -10, 10, 0.01).onChange(tb.update());
          datGui.add(directionalLight.target.position, 'z', -10, 10, 0.01).onChange(tb.update());
          datGui.add(directionalLight.target.position, 'y', 0, 10, 0.01).onChange(tb.update());

          for (let point of nodesIn) {
            var model;
            if (point.isDepot === "true") {
              model = {
                type: 'gltf',
                obj: '../../assets/3DModel/Depot_Point.gltf',
                scale: 0.015,
                rotation: { x: 90, y: 90, z: 0 },
                shadow: true
              }
            } else if (point.isReliefPoint === "true") {
              model = {
                type: 'gltf',
                obj: '../../assets/3DModel/Relief_Point.gltf',
                scale: 0.015,
                rotation: { x: 90, y: 180, z: 0 },
                shadow: true
              }
            } else {
              model = {
                type: 'gltf',
                obj: '../../assets/3DModel/Bus_Stop.gltf',
                scale: 0.01,
                rotation: { x: 90, y: 180, z: 0 },
                shadow: true
              }
            }
            let locatedModel;
            tb.loadObj(model, function (model) {

              locatedModel = model.setCoords([point.longitude - 0.00025, point.latitude, 0]);
              locatedModel.castShadow = true;
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
    let pitch = new PitchToggleNavigation({ minpitchzoom: 10 });

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
        map.addControl(pitch, 'top-left');
      } else {
        map.easeTo({ pitch: 0, bearing: 0 });
        _this._btn.className =
          "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
        map.removeControl(pitch, 'top-left');

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
        const container = document.getElementById('guiDIV');
        container.removeChild(container.childNodes[0]);
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

//retirado de https://codepen.io/roblabs/pen/zJjPzX
class PitchToggleNavigation {

  _pitch: number;
  _minpitchzoom: any;
  _map: any;
  _btn: HTMLButtonElement;
  _container: HTMLDivElement;
  _bearing: number;

  constructor({ bearing = -20, pitch = 70, minpitchzoom = null, }) {
    this._bearing = bearing;
    this._pitch = pitch;
    this._minpitchzoom = minpitchzoom;
  }

  onAdd(map) {
    this._map = map;
    let _this = this;
    let toggle = false;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
    this._btn.type = "button";
    this._btn.textContent = "3P";
    this._btn.onclick = function () {

      //retirado de https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/
      if (!toggle) {
        _this._btn.textContent = "NM";
        toggle = true;
        map.dragRotate.enable();
        let tb;
        var origin = [41.187208, -8.3757027];
        map.addLayer({
          id: 'custom_layer22',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function (map, mbxContext) {

            tb = new THREEBOX(
              map,
              mbxContext,
              {
                defaultLights: true,
                passiveRendering: false
              }
            );

            // import soldier from an external glb file, scaling up its size 20x
            // IMPORTANT: .glb is not a standard MIME TYPE, you'll have to add it to your web server config,
            // otherwise you'll receive a 404 error
            let model = {
              type: 'gltf',
              obj: '../../assets/3DModel/autocarro.gltf',
              scale: 0.009,
              rotation: { x: 90, y: -90, z: 0 }
            }
            let locatedModel;
            tb.loadObj(model, function (model) {

              locatedModel = model.setCoords([-8.3757027,41.187208, 0]);
              tb.add(locatedModel);
            });
            map.flyTo({
              center: [
                -8.3757027,
                41.187208
              ],
              zoom: 18,
              essential: true,
              pitch: 80,
              bearing: 0
            });


            /* var camera, scene, renderer, mesh, goal, keys, follow;

            var coronaSafetyDistance = 0.3;
            var velocity = 0.0;
            var speed = 0.0;
            var longitude = -8.583591;
            var latitude = 41.162513102751454;

            function animate() {

              requestAnimationFrame(animate);

              speed = 0.0;

              if (keys.w)
                speed = 0.01;
              else if (keys.s)
                speed = -0.01;

              velocity += (speed - velocity) * .3;
              mesh.translateZ(velocity);

              if (keys.a)
                mesh.rotateY(0.05);
              else if (keys.d)
                mesh.rotateY(-0.05);

              camera.lookAt(mesh.position);

            } */

            map.bearing = -12;
            map.pitch = 60;

            // pixels the map pans when the up or down arrow is clicked
            var deltaDistance = 5;

            // degrees the map rotates when the left or right arrow is clicked
            var deltaDegrees = 5;
            
            function easing(t) {
              return t * (2 - t);
            }

            map.getCanvas().focus();

            map.getCanvas().addEventListener(
              'keydown',
              function (e) {
                e.preventDefault();
                if (e.which === 87) {
                  // up
                  map.panBy([0, -deltaDistance], {
                    easing: easing
                  });
                  locatedModel.translateY(-0.21435);

                } else if (e.which === 83) {
                  // down
                  map.panBy([0, deltaDistance], {
                    easing: easing
                  });
                  locatedModel.translateY(0.2252);
                } else if (e.which === 65) {
                  // left                 
                  map.easeTo({
                    bearing: map.getBearing() - deltaDegrees,
                    easing: easing
                  });
                  locatedModel.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1).normalize(), 0.087254);
                } else if (e.which === 68) {
                  // right
                  map.easeTo({
                    bearing: map.getBearing() + deltaDegrees,
                    easing: easing
                  });
                  locatedModel.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1).normalize(), -0.087254);
                }
              },
              true
            );

          },

          render: function (gl, matrix) {
            tb.update();
          },

        });
      }
      else {
        _this._btn.textContent = "3P";
        map.dragRotate.disable();
        toggle = false;
        map.removeLayer("custom_layer22");
      }
    }

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






