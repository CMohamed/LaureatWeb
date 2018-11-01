import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Laureat} from '../Model/model.laureat';

@Injectable()
export class LaureatsServices {
  constructor(public http: HttpClient) {

  }
  getLaureats(motCle: string, page: number, size: number ) {
    return this.http.get('http://localhost:8080/chercherLaureats?mc='
      + motCle + '&size=' + size + '&page=' + page);
  }

  getLaureat(id: number) {
    return this.http.get('http://localhost:8080/laureats/' + id);
  }

  saveLaureats(laureat: Laureat ) {
    return this.http.post('http://localhost:8080/laureats', laureat);
  }
  updateLaureat(laureat: Laureat ) {
    return this.http.put('http://localhost:8080/laureats/' + laureat.id, laureat);
  }

}
