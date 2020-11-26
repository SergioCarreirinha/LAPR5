import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { IPath } from '../interfaces/IPath';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  paths: IPath[] = [];
  pathNodes: any[][] = [];
  path: IPath = { line: '', key: '',toGo: true, isEmpty: false, pathNodes: [] };


  constructor(private pathService: PathService) { }

  ngOnInit(): void {
    
  }

  getPaths(line: string): void {
    this.pathService.getPaths(line).subscribe(paths => this.paths = paths)
  }

  
  addPathNode(key: string, node: string, duration: string, distance: string) {

      if (((!key || !node || !duration || !distance) && this.pathNodes.length !==0) || 
          ((!key || !node) && this.pathNodes.length ===0)) {
        console.log('Invalid Paramaters. PathNode wasnt added');
      return;
    }

    if(this.pathNodes.length ===0){
      const pathNode = [key, node];
      this.pathNodes.push(pathNode);

    }else {
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
    this.path.toGo=toGo;
    this.path.isEmpty = isEmpty;
    this.path.pathNodes = this.pathNodes;

    this.pathService.addPath(this.path)
      .subscribe(path => { this.paths.push(path) });

    //reset the array when the path is added
    this.pathNodes = [];
    console.log(this.pathNodes);
  }

}
