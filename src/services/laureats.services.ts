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




  }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  emitList() {
    this.laureatsList$.next(this.laureatsList);
    console.log(this.laureatsList);
  }



  public nouveauFiltre(requete : string, page : number, size : number){




    requete = requete + "%20order%20by%20utilisateur.id%20limit%20" + size + "%20offset%20" + Number(size*page + size);

    console.log(requete);

    return this.httpClient.get(requete);





  }



  getLaureats(motCle: string, page: number, size: number ) {


    return this.httpClient.get('http://localhost:8080/chercherLaureats?mc=' + motCle + '&size=' + size + '&page=' + page);


  }


  getLaureat(id: number) {
    return this.httpClient.get('http://localhost:8080/laureats/' + id);
  }

  saveLaureats(laureat: Laureat ) {
    return this.httpClient.post('http://localhost:8080/laureats', laureat);
  }
  updateLaureat(laureat: Laureat ) {
    return this.httpClient.put('http://localhost:8080/laureats/' + laureat.id, laureat);
  }

}
