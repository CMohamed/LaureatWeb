import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'laureat-detailles',
  templateUrl: './laureat-detailles.component.html',
  styleUrls: ['./laureat-detailles.component.css']
})
export class LaureatDetaillesComponent implements OnInit {


  
  @Input() avancement;
   
  

  constructor() { }

  ngOnInit() {
  }

}
