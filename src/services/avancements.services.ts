import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Laureat} from '../Model/model.laureat';
import {Subject} from 'rxjs';
import {assertNumber} from '@angular/core/src/render3/assert';



@Injectable()
export class AvancementServices {

  private avancementsList: any[] = [];
  avancementsList$ = new Subject<any[]>();


  constructor(public httpClient: HttpClient) {

    this.getAvancements();
    this.emitList();


  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emitList() {
    this.avancementsList$.next(this.avancementsList);
    console.log(this.avancementsList);
  }


  //permet de récupérer le dernier avancement de chaque personne
  getAvancements(){

    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20*%20" +
      "from%20utilisateur%20as%20U,%20avancement%20" +
      "where%20U.id%20=%20avancement.refutilisateur%20" +
      "and%20datetraitement%20is%20not%20null%20" +
      "and%20datetraitement%20%3E=%20" +
          "(select%20datetraitement%20" +
          "from%20utilisateur,%20avancement%20" +
          "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
          "and%20utilisateur.id%20=%20U.id%20" +
          "order%20by%20datetraitement%20desc%20limit%201)%20" +
      "order%20by%20datetraitement%20desc").subscribe( data => {

        this.avancementsList = (data as any).features;
        this.emitList();

      }
    );

  }

}
