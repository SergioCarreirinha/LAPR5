import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ILine } from '../interfaces/ILine';
import { INode } from '../interfaces/INode';
import { IPath } from '../interfaces/IPath';
import { LineService } from '../services/line.service';
import { NodeService } from '../services/node.service';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  paths: IPath[] = [];
  pathNodes: any[][] = [];
  path: IPath = { line: '', key: '', toGo: true, isEmpty: false, pathNodes: [] };
  nodes: INode[] = [];
  lines: ILine[] = [];


  constructor(private serviceLine: LineService,private nodeService: NodeService,private pathService: PathService) { }

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

    if (((!key || !node || !duration || !distance) && this.pathNodes.length !== 0) ||
      ((!key || !node) && this.pathNodes.length === 0)) {
      console.log('Invalid Paramaters. PathNode wasnt added');
      return;
    }

    if (this.pathNodes.length === 0) {
      const pathNode = [key, node];
      this.pathNodes.push(pathNode);

    } else {
      const pathNode = [key, node, parseInt(duration), parseInt(distance)];
      this.pathNodes.push(pathNode);
    }

    console.log(this.pathNodes.length + ' pathNodes added');
    console.log(this.pathNodes);
  }

  addPath(line: string, key: string, toGo: boolean, isEmpty: boolean): void {
    line = line.trim();
    key = key.trim();

    if (!line || !key || !this.pathNodes || this.pathNodes.length === 0) {
      console.log('Invalid Paramaters. Path wasnt added');
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
  }

}
