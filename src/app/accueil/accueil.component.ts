import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";



@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}


@Component({
  selector: 'accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {



  //url : string = "assets/accueilEhpt.html";
  url : string = "http://127.0.0.1:8080/webehtp/www.ehtp.ac.ma/index.html";

  constructor() { }

  ngOnInit() {

  }


}
