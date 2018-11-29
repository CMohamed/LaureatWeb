import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AvancementServices} from '../../services/avancements.services';

@Component({
  selector: 'app-historique-laureat',
  templateUrl: './historique-laureat.component.html',
  styleUrls: ['./historique-laureat.component.css']
})
export class HistoriqueLaureatComponent implements OnInit {



  public avancementsHistoriqueList : any[];

  @Input() dernierAvancementId : string;

  constructor(public avancementServices : AvancementServices) {






  }

  ngOnInit() {

    console.log(this.dernierAvancementId);

    if(this.dernierAvancementId){

      this.avancementServices.getHistoriqueAvancementById(this.dernierAvancementId).subscribe(

        (avancementsHistoriqueImported: any[]) => {

          this.avancementsHistoriqueList = (avancementsHistoriqueImported as any).features;

          for(let i =0; i<this.avancementsHistoriqueList.length; i++){

            this.avancementsHistoriqueList[i]["detailAffiche"] = false;
            this.avancementsHistoriqueList[i]["editionAffiche"] = false;

          }

          console.log(this.avancementsHistoriqueList);

        }
      );

    }

  }

}
