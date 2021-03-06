import { Component, OnInit } from '@angular/core';
import { ILine } from '../interfaces/ILine';
import { INode } from '../interfaces/INode';
import { IPath } from '../interfaces/IPath';
import { LineService } from '../services/line/line.service';
import { NodeService } from '../services/node/node.service';
import { PathService } from '../services/path/path.service';
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
  nodes: INode[] = [];
  lines: ILine[] = [];


  constructor(private serviceLine: LineService, private nodeService: NodeService, private pathService: PathService, private location: Location) { }

  ngOnInit(): void {
    this.getPaths();
    this.getNodes();
    this.getLines();
  }

  private getLines() {
    this.serviceLine.getLines().subscribe(line => this.lines = line);
  }

  private getNodes() {
    this.nodeService.getNodes().subscribe(node => this.nodes = node);
  }

  private getPaths(): void {
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
    for (var i = 0; i < this.pathNodes.length; i++) {
      console.log(this.pathNodes[i][1] + '=' + node);
      if (this.pathNodes[i][1] === node) {
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
    if (this.pathNodes.length === 1) {
      text = this.pathNodes.length + ' pathNode added.';
    } else {
      text = this.pathNodes.length + ' pathNodes added.';
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
        title: 'Aviso!',
        text: "Caminho n??o foi adicionado, verifique os par??metros!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    if (this.pathNodes.length === 1) {

      Swal.fire({
        title: 'Aviso!',
        text: "Caminho n??o foi adicionado, tem que ter mais que um N??!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    this.pathService.addPath({
      line: line,
      key: key,
      toGo: toGo,
      isEmpty: isEmpty,
      pathNodes: this.pathNodes
    } as IPath)
      .subscribe((res:any) => { 
        //reset the array when the path is added
        this.pathNodes = [];

        Swal.fire({
          title: 'Sucesso!',
          text: 'Caminho criado!',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: false,
        })
      }, (err:any) => {
        if(err.status == 406) {
          Swal.fire({
            title: 'Erro!',
            text: 'J?? existe um caminho com essa chave!',
            icon: 'error',
            confirmButtonText: 'Ok',
            timer: 2500,
            showConfirmButton: false,
          })
        }
      });

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

  constructor(private pathService: PathService, private serviceLine: LineService, private location: Location) { }

  ngOnInit(): void {
    this.getLines();
  }

  private getLines() {
    this.serviceLine.getLines().subscribe(line => this.selectLine = line);
  }

  getLinePaths(line: string) {
    this.linePaths = [];
    this.res = [];
    this.pathService.getLinePaths(line).subscribe(paths => this.getPathsInfo(paths));

    /*console.log("Nodes:");
    console.log(this.nodes);*/
  }

  private getPathsInfo(p: any[]) {
    for (let i = 0; i < p.length; i++) {

      if (p[i].linePath != undefined) {

        for (let j = 0; j < p[i].linePath.length; j++) {
          const key = p[i].linePath[j].path;
          this.getPathByKey(key);
        }

      } else {
        this.getPathByKey(p[i].props.path)
      }
    }
  }

  private getPathByKey(key: string) {
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
