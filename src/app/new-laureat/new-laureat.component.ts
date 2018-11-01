import { Component, OnInit } from '@angular/core';
import {Laureat} from '../../Model/model.laureat';
import {LaureatsServices} from '../../services/laureats.services';
import {e} from '../../../node_modules/@angular/core/src/render3';

@Component({
  selector: 'app-new-laureat',
  templateUrl: './new-laureat.component.html',
  styleUrls: ['./new-laureat.component.css']
})
export class NewLaureatComponent implements OnInit {
  laureat: Laureat = new Laureat();
  mode: number = 1;
  constructor(public laureatsService: LaureatsServices) { }

  ngOnInit() {
  }

  saveLaureat() {
    this.laureat.dateInscription = new Date(); // ana haaarbe
    this.laureatsService.saveLaureats(this.laureat)
      .subscribe((data: any) => {
        this.laureat = data ;
        console.log(data);
        this.mode = 2;
      },err => {
        console.log(err);
      });
  }

}
