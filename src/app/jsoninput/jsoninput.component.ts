import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-jsoninput',
  templateUrl: './jsoninput.component.html',
  styleUrls: ['./jsoninput.component.css']
})
export class JsoninputComponent implements OnInit {

  @Output() jsonInvalid = new EventEmitter();
  @Output() formattedJson = new EventEmitter();

  rawJson: string;
  jsonError: string;

  constructor() { }

  ngOnInit() {
  }

  rawJsonChanged(evt){
    this.rawJson = evt;
  }

  format() {
    this.jsonError='';  
    try{
      const jsonNode = JSON.parse(this.rawJson);
      this.formattedJson.emit( JSON.stringify(jsonNode,null,4) )
    }
    catch(e){
      this.jsonInvalid.emit();
      this.jsonError = e.message;
    }
  }
}
