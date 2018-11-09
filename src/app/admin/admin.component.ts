import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {LaureatsServices} from '../../services/laureats.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public laureatsListSubscription : Subscription;
  public laureatsList : any[];
  public router :Router;

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

      }
    );
  }

  ngOnInit() {
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
