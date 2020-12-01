import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as Mappa from 'mappa-mundi';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public constructor() { }

  public ngOnInit() { 
    this.createMap();
  }


  createMap(){
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const canvas = document.getElementById("map") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });
    const key = "pk.eyJ1IjoiY3VuaGFhcyIsImEiOiJja2k0eXFsaDEwMXFvMnJucTlzOTE4bjk3In0.1BWcHMvsWG8bpgOSa2LNng";
    const options = {
      lat: 41.14961, 
      lng: -8.61099,
      zoom: 13,
    }
    scene.add(camera);
    renderer.setSize(window.innerWidth-60, window.innerHeight-150);
    // Light
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(0, 0, 6);
    scene.add(light);

    const mappa = new Mappa('MapboxGL', key);
    const myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    
  }

}
