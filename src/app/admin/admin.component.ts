import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Laureat} from '../../Model/model.laureat';
import {AvancementServices} from '../../services/avancements.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public avancementsListSubscription : Subscription;
  public avancementsList : any[];
  public router :Router;


  dataSource: any;

  currentPage: number = 0;
  filiere :string;
  promotion :string;
  secteur :string;
  genre :string;
  province :string;
  organisme :string;
  quota: number;

  constructor(public avancementServices : AvancementServices) {

    this.avancementsListSubscription = this.avancementServices.avancementsList$.subscribe(
      (avancementsImported: any[]) => {

        this.avancementsList = avancementsImported;
        console.log(avancementsImported);

      }
    );

  }

  ngOnInit() {
    this.genre=""; this.filiere=""; this.province=""; this.organisme=""; this.secteur=""; this.promotion="";this.quota=2;
  }


}
