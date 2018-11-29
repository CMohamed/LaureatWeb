import {Component, Input, OnInit} from '@angular/core';
import {AvancementServices} from '../../services/avancements.services';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-edit-laureat',
  templateUrl: './edit-laureat.component.html',
  styleUrls: ['./edit-laureat.component.css']
})
export class EditLaureatComponent implements OnInit {

  @Input() dernierAvancement;

  public etat : any;
  public motif : any;



  constructor(public avancementServices : AvancementServices, public httpClient: HttpClient) {


    console.log(formatDate(new Date(), 'yyyy-MM-dd', 'en'));




  }

  ngOnInit() {

    this.etat = "";
    this.motif = "";



  }


  modifierAvancement() {

    console.log(this.dernierAvancement);

    this.httpClient.get("http://localhost:9090/requestAny/" +
      "INSERT%20INTO%20" +
      "avancement%20" +
      "(datetraitement,%20motif,%20refutilisateur,%20etat)%20" +
      "VALUES%20" +
      "('" + formatDate(new Date(), 'yyyy-MM-dd', 'en').toString() + "','" + this.motif + "',%20" + this.dernierAvancement.refutilisateur +  ",%20'"+ this.etat +"')").subscribe( data => {

    }, err => {
      console.log("une erreur a été survenue : ce qui normale dans une requete insert")
    });


  }


}
