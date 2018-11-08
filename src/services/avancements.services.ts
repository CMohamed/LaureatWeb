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

    this.emitList();


  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emitList() {
    this.avancementsList$.next(this.avancementsList);
    console.log(this.avancementsList);
  }

  getAvancements(){

    this.httpClient.get("select")

  }

}
