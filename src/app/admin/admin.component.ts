import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


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

  avancementDetail = null;


  constructor(public avancementServices : AvancementServices) {

    this.avancementsListSubscription = this.avancementServices.avancementsList$.subscribe(
      (avancementsImported: any[]) => {

        this.avancementsList = avancementsImported;

        for(let i =0; i<this.avancementsList.length; i++){

          this.avancementsList[i]["detailAffiche"] = false;
          this.avancementsList[i]["editionAffiche"] = false;

        }
        console.log(avancementsImported);

      }
    );

  }

  ngOnInit() {
    this.genre=""; this.filiere=""; this.province=""; this.organisme=""; this.secteur=""; this.promotion="";this.quota=2;
  }



  editer(avancement){


    if(avancement.editionAffiche == false){

      avancement.detailAffiche = false;
      avancement.editionAffiche = true;

    }
    else{

      avancement.detailAffiche = false;
      avancement.editionAffiche = false;


    }


  }

  historique(avancement){




  }

  detail(avancement){

    if(avancement.detailAffiche == false){

      avancement.editionAffiche = false;
      avancement.detailAffiche = true;

    }
    else{

      avancement.detailAffiche = false;
      avancement.editionAffiche = false;


    }


  }


}
