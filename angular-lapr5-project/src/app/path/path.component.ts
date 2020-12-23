import { Component, OnInit } from '@angular/core';
import { ILine } from '../interfaces/ILine';
import { INode } from '../interfaces/INode';
import { IPath } from '../interfaces/IPath';
import { LineService } from '../services/line.service';
import { NodeService } from '../services/node.service';
import { PathService } from '../services/path.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

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
  res: any[] = [];
  //nodes: string[][]=[];

  constructor(private pathService: PathService,private serviceLine: LineService, private location: Location) { }

  ngOnInit(): void {
    this.getLines();
  }

  getLines() {
    this.serviceLine.getLines().subscribe(line => this.selectLine = line);
  }

  getLinePaths(line: string) {
    this.linePaths=[];
    this.res = [];
    this.pathService.getLinePaths(line).subscribe(paths => this.getPathsInfo(paths));

    /*console.log("Nodes:");
    console.log(this.nodes);*/
  }

  private getPathsInfo(p: any[]){
    for(let i=0; i<p.length; i++){

      if(p[i].linePath != undefined){

          for(let j=0; j< p[i].linePath.length; j++){
            const key = p[i].linePath[j].path;
            this.getPathByKey(key);
          }

      }else{
        this.getPathByKey(p[i].props.path)
      }
    }
  }

  private getPathByKey(key: string){
    this.pathService.getPathByKey(key).subscribe(p => this.linePaths.push(p));
  }

/*   private getPathNodes(path: IPath) : IPath{
    var x=0;
    for(let i=0; i<path.pathNodes.length;i++){

      if(path.pathNodes[i].pathNode != undefined){

        for(let j=0; j<path.pathNodes[i].pathNode.length; j++){
            this.nodes[i][j]=path.pathNodes[i].pathNode[j].node;
        }

      } else {
        this.nodes[i][x]=path.pathNodes[i].node;
      }
    }
    return path;
  } */

  goBack(): void {
    this.location.back();
  }
}
