import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


import {AuthentificationServices} from '../../services/authentification.services';
import {AvancementServices} from '../../services/avancements.services';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public currentUserSubscription : Subscription;
  public currentUser: any;

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


  constructor(public authentificationServices:AuthentificationServices, public avancementServices : AvancementServices) {

        //this.authentificationServices.emit();
        this.currentUserSubscription = this.authentificationServices.currentAuthentified$.subscribe(data => {
          this.currentUser = data;
          console.log(data);


        });
    this.authentificationServices.emit();


    this.avancementsListSubscription = this.avancementServices.avancementsList$.subscribe(
          (avancementsImported: any[]) => {

            this.avancementsList = avancementsImported;

            for(let i =0; i<this.avancementsList.length; i++){

              this.avancementsList[i]["detailAffiche"] = false;
              this.avancementsList[i]["editionAffiche"] = false;
              this.avancementsList[i]["historiqueAffiche"] = false;

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
      avancement.historiqueAffiche = false;


    }
    else{

      avancement.detailAffiche = false;
      avancement.editionAffiche = false;
      avancement.historiqueAffiche = false;



    }


  }

  historique(avancement){

    if(avancement.historiqueAffiche == false){

      avancement.editionAffiche = false;
      avancement.detailAffiche = false;
      avancement.historiqueAffiche = true;

    }
    else{

      avancement.historiqueAffiche = false;
      avancement.detailAffiche = false;
      avancement.editionAffiche = false;


    }




  }

  detail(avancement){

    if(avancement.detailAffiche == false){

      avancement.editionAffiche = false;
      avancement.detailAffiche = true;
      avancement.historiqueAffiche = false;


    }
    else{

      avancement.detailAffiche = false;
      avancement.editionAffiche = false;
      avancement.historiqueAffiche = false;



    }


  }


}
