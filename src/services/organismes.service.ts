import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";


/*
  Generated class for the OrganismesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrganismesServices {

  private organismeList: any[] = [];
  organismeList$ = new Subject<any[]>();


  constructor(public httpClient: HttpClient) {

    let requete = "http://localhost:9090/requestAny/select%20*%20from%20organisme";

    this.httpClient.get(requete)
      .subscribe(data => {

        // la tu vas voir la requete dans la console et tu va comprendre dak sa3a comment exploiter les données
        console.log(data);

        //par exemple ila bghit le nom de l'oganisme lewel li jani fla requete hawa lcode li ghadi ndir
        let lewelNom = (data as any).features[0].nomorganisme;


        this.organismeList = (data as any).features;
        this.emitList();


      });



    console.log('Hello OrganismesProvider Provider');



  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emitList() {
    this.organismeList$.next(this.organismeList);
  }



  saveList() {


  }

  addOrganisme(organisme:any):void{


    let requete = "http://localhost:9090/requestAny/Insert%20into%20organisme%20(nomorganisme,secteur,long,lat,province)%20values%20('"+ organisme.nomorganisme +"',%20'"+ organisme.secteur +"',%20"+ organisme.long +",%20"+ organisme.lat +",%20'"+ organisme.province +"')";

    this.httpClient.get(requete)
      .subscribe(data => {

        this.organismeList = (data as any).feature;
        this.emitList();


      },err => {


        this.organismeList.push(organisme);
        this.emitList();


      });


  }




}
