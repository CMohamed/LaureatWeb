import { Component, OnInit,Input } from '@angular/core';
import {AvancementServices} from '../../services/avancements.services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'laureat-detailles',
  templateUrl: './laureat-detailles.component.html',
  styleUrls: ['./laureat-detailles.component.css']
})
export class LaureatDetaillesComponent implements OnInit {



  @Input() dernierAvancement;
   
  

  constructor(public avancementServices : AvancementServices) {



  }

  ngOnInit() {
  }

}
