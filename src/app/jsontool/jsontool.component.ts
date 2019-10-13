import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JsontreeComponent } from '../jsontree/jsontree.component';

@Component({
  selector: 'app-jsontool',
  templateUrl: './jsontool.component.html',
  styleUrls: ['./jsontool.component.css']
})
export class JsontoolComponent implements OnInit, AfterViewInit {

  @ViewChild(JsontreeComponent)
  jsontree: JsontreeComponent;

  validJson : boolean = false;
  json: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if( this.validJson ){
      //this.jsontree.loadJson(this.json);
    }
  }

  invalidJson(){
    this.validJson = false;
    this.json = null;
    this.jsontree.loadJson(this.json);
  }

  formattedJson( json ){
    this.validJson = true;
    this.json = json;
    this.jsontree.loadJson(this.json);
  }

}
