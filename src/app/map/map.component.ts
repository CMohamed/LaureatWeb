import { Component, OnInit } from '@angular/core';

import { loadModules } from 'esri-loader';
import {LaureatsServices} from '../../services/laureats.services';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  constructor(public laureatService : LaureatsServices) { }



  ngOnInit() {
  }

}
