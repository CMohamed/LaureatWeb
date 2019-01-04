import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Laureat} from '../Model/model.laureat';
import {Subject} from 'rxjs';
import {assertNumber} from '@angular/core/src/render3/assert';



@Injectable()
export class LaureatsServices {

  private laureatsList: any[] = [];
  laureatsList$ = new Subject<any[]>();



  constructor(public httpClient: HttpClient) {

    this.emitList();



  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emitList() {
    this.laureatsList$.next(this.laureatsList);
    console.log(this.laureatsList);
  }



  public nouveauFiltre(genre,filiere,province,organisme,secteur,promotion,quota){

    let requeteFiltre = "http://localhost:9090/requestAny/select%20nom,email,prenom,photo,organisme.long,organisme.lat,filiere,promotion,organisme.secteur,genre,organisme.province,nomorganisme%20from%20utilisateur,organisme%20";
    let clauseWhere = "";

    console.log(secteur == "");

    if(filiere != ""){
      clauseWhere = clauseWhere + "filiere%20='" + filiere + "'%20and%20";
    }

    if(promotion != ""){

      clauseWhere = clauseWhere + "promotion%20='" + promotion + "'%20and%20";

    }

    if(secteur != "" ){

      clauseWhere = clauseWhere + "organisme.secteur%20='" + secteur + "'%20and%20";

    }

    if(genre != ""){

      clauseWhere = clauseWhere + "genre%20='" + genre + "'%20and%20";

    }


    if(province != ""){

      clauseWhere = clauseWhere + "organisme.province%20='" + province + "'%20and%20";

    }

    if(organisme != ""){

      clauseWhere = clauseWhere + "nomorganisme%20='" + organisme + "'%20and%20";

    }


    if(clauseWhere != ""){

      requeteFiltre = requeteFiltre + "where%20utilisateur.reforganisme=organisme.id%20and%20";

      requeteFiltre = requeteFiltre +clauseWhere.substring(0,clauseWhere.length-9);

    }
    else{
      requeteFiltre = requeteFiltre + "where%20utilisateur.reforganisme=organisme.id%20";

    }


    this.httpClient.get(requeteFiltre.replace("select%20nom,email,prenom,photo,organisme.long,organisme.lat,filiere,promotion,organisme.secteur,genre,organisme.province,nomorganisme","select%20count(*)%20"))
      .subscribe(data1 => {


        let nombreEnregistrement = Number((data1 as any).features[0].count);

        //console.log(nombreEnregistrement);

        this.laureatsList = [];

        for(let i=0;i< (Math.trunc(nombreEnregistrement/quota)+1);i++){

          let requeteFilitreI = requeteFiltre  + "%20order%20by%20utilisateur.id%20limit%20" + quota + "%20offset%20" + Number(quota*i);

          this.httpClient.get(requeteFilitreI)
            .subscribe(data2 => {
              console.log((data2 as any).features);
              this.laureatsList = this.laureatsList.concat((data2 as any).features);
              console.log(this.laureatsList);
              this.emitList();



            });



        }



      });






  }



}
