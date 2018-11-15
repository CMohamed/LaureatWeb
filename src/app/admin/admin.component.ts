import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {LaureatsServices} from '../../services/laureats.services';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Laureat} from '../../Model/model.laureat';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public laureatsListSubscription : Subscription;
  public laureatsList : any[];
  public router :Router;

  columnsToDisplay: string[] = ['nom', 'prenom', 'filiere', 'promotion', 'genre', 'nomorganisme', 'secteur', 'email', 'Gestion'];

  dataSource: any;

  currentPage: number = 0;
  filiere :string;
  promotion :string;
  secteur :string;
  genre :string;
  province :string;
  organisme :string;
  quota: number;

  constructor(public laureatsServices : LaureatsServices) {
    this.laureatsListSubscription = this.laureatsServices.laureatsList$.subscribe(
      (laureatsImported: any[]) => {

        this.laureatsList = laureatsImported;
        console.log(laureatsImported);
        this.dataSource = new MatTableDataSource<Laureat>(this.laureatsList);

      }
    );
  }

  ngOnInit() {
    this.genre=""; this.filiere=""; this.province=""; this.organisme=""; this.secteur=""; this.promotion="";this.quota=2;
  }

  doSearch() {

    this.laureatsServices.nouveauFiltre(this.genre,this.filiere,this.province,this.organisme,this.secteur,this.promotion,this.quota);


  }
  chercher() {
    this.doSearch();
  }

  goToPage(i: number) {
    this.currentPage = i;
    this.doSearch();
  }

  onEditLaureat(id: number) {
    this.router.navigate(['editLaureat',id]);
  }
}
