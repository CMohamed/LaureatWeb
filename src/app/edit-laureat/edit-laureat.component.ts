import { Component, OnInit } from '@angular/core';
import {Laureat} from '../../Model/model.laureat';
import {ActivatedRoute, Router} from '@angular/router';
import {LaureatsServices} from '../../services/laureats.services';

@Component({
  selector: 'app-edit-laureat',
  templateUrl: './edit-laureat.component.html',
  styleUrls: ['./edit-laureat.component.css']
})
export class EditLaureatComponent implements OnInit {
  mode: number = 1;
  laureat: Laureat = new Laureat();
  idLaureat: number;
  constructor(public activatedRoute: ActivatedRoute,
              public laureatsService: LaureatsServices,
              public router: Router) {
    this.idLaureat = activatedRoute.snapshot.params['id'];
    /*
    console.log('......................................');
    console.log(activatedRoute.snapshot.params['id']);
    console.log('......................................');
*/

  }

  ngOnInit() {
    /*
    this.laureatsService.getLaureat(this.idLaureat)
      .subscribe((data: any)  => {
        this.laureat = data;
      },err => {
        console.log(err);
      });
      */
  }

  updateLaureat() {
    /*
    this.laureatsService.updateLaureat(this.laureat)
      .subscribe((data) => {
        alert('Mise à jour effectué !');
        this.router.navigate(['laureats']);
      },err => {
        console.log(err);
      });
      */
  }

}
