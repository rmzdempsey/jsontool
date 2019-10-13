import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined, isString, isObject } from 'util';
import { ParseTreeResult } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-jsontree',
  templateUrl: './jsontree.component.html',
  styleUrls: ['./jsontree.component.css']
})
export class JsontreeComponent implements OnInit {

  lines : Array<JsonLine>;
  visibleLines : Array<JsonLine>;

  constructor() { }

  ngOnInit() {
  }

  loadJson( json ){
    if(json){
      this.convertToLines(json);
    }
    else{
      this.visibleLines = [];
    }
  }

  private convertToLines(json:string) {
    const rawText = json.split("\n");
    const jsonNode = JSON.parse(json);
    this.lines = [];
    this.parseTree( jsonNode, 0, 0, rawText );
    this.visibleLines = new Array<JsonLine>();
    this.lines.forEach(line=>this.visibleLines.push(line));
  }

  private parseTree(jsonNode, indent: number, lineNo: number, rawLines : Array<string> ): number{
    const type = this.getType(jsonNode);
    let addedCount = 1;
    if( type === 'array'){
      if( rawLines[lineNo].endsWith( '[]' ) || rawLines[lineNo].endsWith( '[],' )){
        this.lines.push(new JsonLine(lineNo,'empty-array',indent,rawLines[lineNo]));
      }
      else{
        this.lines.push(new JsonLine(lineNo,'open-array',indent,rawLines[lineNo]));
        jsonNode.forEach(ele=>{
          addedCount = addedCount + this.parseTree(ele,indent+1,lineNo + addedCount,rawLines);
        })
        this.lines.push(new JsonLine(lineNo + addedCount,'close-array',indent,rawLines[lineNo + addedCount]));
        addedCount++;
      }
    }
    else if( type === 'object'){
      if( rawLines[lineNo].endsWith('{}') || rawLines[lineNo].endsWith('{},')){
        this.lines.push(new JsonLine(lineNo,'empty-object',indent,rawLines[lineNo]));
      }
      else{
        this.lines.push(new JsonLine(lineNo,'open-object',indent,rawLines[lineNo]));
        Object.keys(jsonNode).forEach(key=>{
          addedCount = addedCount + this.parseTree(jsonNode[key],indent+1,lineNo + addedCount,rawLines);
        })
        this.lines.push(new JsonLine(lineNo + addedCount,'close-object',indent,rawLines[lineNo + addedCount]));
        addedCount++;
      }
    }
    else{
      this.lines.push(new JsonLine(lineNo,type,indent,rawLines[lineNo]));
    }
    return addedCount;
  }

  getType(jsonNode) : string {
    if( isNullOrUndefined(jsonNode) ) return 'null';
    else if( Array.isArray(jsonNode) ) return 'array';
    else if( isString(jsonNode) ) return 'string';
    else if( isObject(jsonNode) ) return 'object';
    return 'primitive';
  }

  expand( line: JsonLine ){
    line.expanded = !line.expanded;
    this.visibleLines = new Array<JsonLine>();
    let hiddenIndent = -1;
    for( let i = 0; i<this.lines.length; i++ ){
      const l : JsonLine = this.lines[i];
      if( l.expanded) this.visibleLines.push(l);
      else{
        hiddenIndent = l.indent;
        this.visibleLines.push(l);
        i++;
        while( this.lines[i].indent != hiddenIndent ){
          i++;
        }
        hiddenIndent=-1;
      }
    }
  }

  isVisible(): boolean{
    return this.visibleLines && this.visibleLines.length > 0 ;
  }
}

class JsonLine {
  indents: Array<number>;
  expanded : boolean;
  constructor(public lineNo: number,
    public type: string,
    public indent: number,
    public rawText: string){
      this.expanded = true;
      this.indents = new Array<number>();
      for( let i =0; i<this.indent; i++){
        this.indents.push(i);
      }
    }
}
