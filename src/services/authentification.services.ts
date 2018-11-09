import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Laureat} from '../Model/model.laureat';
import {Subject} from 'rxjs';
import {assertNumber} from '@angular/core/src/render3/assert';



@Injectable()
export class AuthentificationServices {

  private currentAuthentified: any ;
  currentAuthentified$ = new Subject<any>();



  getCurrentAuthentified (){
    return this.currentAuthentified;
  }
  constructor(public httpClient: HttpClient) {

    this.emit();


  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emit() {
    this.currentAuthentified$.next(this.currentAuthentified);
  }

  authentification(email,mdp){

    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20nom,prenom,email,role,photo%20" +
      "from%20utilisateur%20" +
      "where%20email%20=%20'"+ email +"'%20" +
      "and%20mdp%20=%20'"+ mdp +"'").subscribe( data => {

        if((data as any) && (data as any).features && (data as any).features.count != 0){

          this.currentAuthentified = (data as any).features[0];
          console.log("------------ Authentification service ------------------");
          console.log( this.currentAuthentified);
          console.log("--------------------------------------------------------");
          this.emit();

        }
        else{

          this.currentAuthentified = null;
          console.log("---------- Authentification service _else_ : ----------");
          console.log( this.currentAuthentified);
          console.log("------------------------------------------------------");
          this.emit();

        }
      console.log("---------- Authentification after if-Else   : ----------");
        console.log( this.currentAuthentified);
      console.log("----------------------------------------------------------");

      }
    );

  }

}
