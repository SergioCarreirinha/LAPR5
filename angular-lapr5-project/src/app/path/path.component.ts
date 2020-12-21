import { Component, OnInit } from '@angular/core';
import { ILine } from '../interfaces/ILine';
import { INode } from '../interfaces/INode';
import { IPath } from '../interfaces/IPath';
import { LineService } from '../services/line.service';
import { NodeService } from '../services/node.service';
import { PathService } from '../services/path.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  paths: IPath[] = [];
  pathNodes: any[][] = [];
  path: IPath = { line: '', key: '', toGo: true, isEmpty: false, pathNodes: [], totalDur: 0, totalDist: 0 };
  nodes: INode[] = [];
  lines: ILine[] = [];


  constructor(private serviceLine: LineService,private nodeService: NodeService,private pathService: PathService, private location: Location) { }

  ngOnInit(): void {
    this.getPaths();
    this.getNodes();
    this.getLines();
  }

  getLines() {
    this.serviceLine.getLines().subscribe(line => this.lines = line);
  }

  getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }

  getPaths(): void {
    this.pathService.getPaths().subscribe(paths => this.paths = paths)
  }


  addPathNode(key: string, node: string, duration: string, distance: string) {

    //PathNode Parameter verification
    if (((!key || !node || !duration || !distance) && this.pathNodes.length !== 0) ||
      ((!key || !node) && this.pathNodes.length === 0)) {
      console.log("Invalid Paramaters. PathNode wasn't added");

      Swal.fire({
        title: 'Warning!',
        text: "PathNode couldn't be added. Invalid Paramaters.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    //Verify if node already exists in path
    for(var i=0; i<this.pathNodes.length;i++){
      console.log(this.pathNodes[i][1]+'='+node);
      if(this.pathNodes[i][1] === node){
        console.log('Node already exists in path.');

        Swal.fire({
          title: 'Warning!',
          text: "PathNode couldn't be added. Node already exists in path.",
          icon: 'warning',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: false,
        })
        return;
      }

    }

    //Adding pathNodes
    if (this.pathNodes.length === 0) {
      const pathNode = [key, node];
      this.pathNodes.push(pathNode);

    } else {
      const pathNode = [key, node, parseInt(duration), parseInt(distance)];
      this.pathNodes.push(pathNode);
    }

    //Printing on console
    console.log(this.pathNodes.length + ' pathNodes added');
    console.log(this.pathNodes);


    //Path Success Message
    var text = '';
    if(this.pathNodes.length===1){
      text = this.pathNodes.length+' pathNode added.';
    }else{
      text = this.pathNodes.length+' pathNodes added.';
    }

    Swal.fire({
      title: 'Success!',
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 2500,
      showConfirmButton: false,
    })
    
  }

  addPath(line: string, key: string, toGo: boolean, isEmpty: boolean): void {
    line = line.trim();
    key = key.trim();

    if (!line || !key || !this.pathNodes || this.pathNodes.length === 0) {
      console.log('Invalid Paramaters. Path wasnt added');

      Swal.fire({
        title: 'Warning!',
        text: "Path couldn't be added. Invalid Paramaters.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    if(this.pathNodes.length === 1){
      
      Swal.fire({
        title: 'Warning!',
        text: "Path couldn't be added. It should have more than one node!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    this.path.line = line;
    this.path.key = key;
    this.path.toGo = toGo;
    this.path.isEmpty = isEmpty;
    this.path.pathNodes = this.pathNodes;

    this.pathService.addPath(this.path)
      .subscribe(path => { this.paths.push(path) });

    //reset the array when the path is added
    this.pathNodes = [];
    console.log(this.pathNodes);

    Swal.fire({
      title: 'Success!',
      text: 'Path Created',
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 2500,
      showConfirmButton: false,
    })
  }

  goBack(): void {
    this.location.back();
  }

}

@Component({
  selector: 'app-listLinePaths',
  templateUrl: './listLinePaths.component.html',
  styleUrls: ['./path.component.css']
})

export class ListPathsComponent implements OnInit {
  
  linePaths: IPath[] = [];
  selectLine: ILine[] = [];


  constructor(private pathService: PathService,private serviceLine: LineService, private location: Location) { }

  ngOnInit(): void {
    this.getLines();
  }

  getLines() {
    this.serviceLine.getLines().subscribe(line => this.selectLine = line);
  }

  getLinePaths(line: string) {
    console.log(line);
    this.pathService.getLinePaths(line.trim()).subscribe(paths => this.linePaths = paths);
    console.log(this.linePaths);
  }

  goBack(): void {
    this.location.back();
  }
}
