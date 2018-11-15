import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'laureat-detailles',
  templateUrl: './laureat-detailles.component.html',
  styleUrls: ['./laureat-detailles.component.css']
})
export class LaureatDetaillesComponent implements OnInit {

  Detailles1 = {
    avancement : "accepted",
    photo : "url",

  };
  Detailles = {
    avancement : "nonAccepted",
    photo : "url",

  };
  
  @Input() avancement;
   
  

  constructor() { }

  ngOnInit() {
  }

}
