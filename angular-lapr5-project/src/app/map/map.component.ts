import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { NodeService } from '../services/node.service';
import { LineService } from '../services/line.service';
import { PathService } from '../services/path.service';
import { environment } from 'src/environments/environment';
import { exit } from 'process';

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
    this.setArrayNodes();
    this.setArrayPaths();
    this.setArrayLines();
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.dragRotate.disable();

    this.map.on('load', () => {
      this.drawNodes();
      this.drawLines();
    });
  }
  drawNodes(){
    this.nodeService.getNodes().subscribe(node => {
      this.nodes = node;
      for (var i =0;i<this.nodes.length;i++){
        
        new mapboxgl.Marker({color:'red', scale:1 }).setLngLat([this.nodes[i].longitude, this.nodes[i].latitude]).setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(
            this.nodes[i].key + ' name:' +
            this.nodes[i].name +
              ' Lat: ' +
              this.nodes[i].latitude +
              '   Lon: ' +
              this.nodes[i].longitude,
          ),
        ).addTo(this.map);
      }
    })
  }
  setArrayLines() {
    this.lineService.getLines().subscribe(lines => {
      this.lines= lines;
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
  async drawLines(){
    
      for (let i = 0; i < this.lines.length; i++) {
        var coords:any[] = [];
        var pathLine: any;
        if (this.lines[i].linePaths != undefined) {
          pathLine = this.lines[i].linePaths[0].linePath;
        }
        for(let z=0;z<pathLine.length;z++){
          var nodePath: any[] =[];
          for(let pa = 0; pa < this.paths.length; pa++){
            if(pathLine[z].path == this.paths[pa].key){
              nodePath = this.paths[pa].pathNodes[0].pathNode;
            }
          }
          console.log(nodePath);
          if(pathLine[z].orientation == "Go"){
            for (let j = 0; j < nodePath.length; j++) {
                var nodesToLine:any[]=[];
                for (let k = 0; k < this.nodes.length; k++) {
                  if (nodePath[j].node == this.nodes[k].key) {
                    nodesToLine.push(this.nodes[k]);
                  }
                }
            
                for (let k = 0; k < nodesToLine.length; k++) {
                  var lat=nodesToLine[k].latitude;
                  var long=nodesToLine[k].longitude;
                  coords.push([long,lat]);
                }
            }
          }
        }
        this.drawLine(coords,this.lines[i].name,this.rgbToHex(this.lines[i].color));
        coords = [];
        
      }
  }
  drawLine(coord:Array<any>, name:string,color:string){
    this.map.addSource(name, {
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
    }); 
  }
  rgbToHex(st:string) {
    var r = st.split(",");
    var red = parseInt(r[0].replace('RGB(',''));
    var green = parseInt(r[1]);
    var blue = parseInt(r[2].replace(')',''));

    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
  }
}

