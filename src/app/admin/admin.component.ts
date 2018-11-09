import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {LaureatsServices} from '../../services/laureats.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public laureatsListSubscription : Subscription;
  public laureatsList : any[];

  constructor(public laureatsServices : LaureatsServices) {
    this.laureatsListSubscription = this.laureatsServices.laureatsList$.subscribe(
      (laureatsImported: any[]) => {

        console.log(laureatsImported);

      }
    );
  }

  ngOnInit() {
  }

}
