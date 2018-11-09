import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LaureatsServices} from 'src/services/laureats.services';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl} from '@angular/forms';
import {Laureat} from '../../Model/model.laureat';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {OrganismesServices} from '../../services/organismes.service';
import {any} from '../../../node_modules/codelyzer/util/function';

@Component({
  selector: 'app-laureats',
  templateUrl: './laureats.component.html',
  styleUrls: ['./laureats.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class LaureatsComponent implements OnInit {

  public laureatsListSubscription : Subscription;
  public laureatsList : any[];
  public organismesListSubscription : Subscription;
  public organismesList : any[];
  motCle: string = "";
  size: number = 4;
  quota = 2; //c'est le nombre maximal d'enregistrements qu'on peut récupérer à partir d'une requet http
  currentPage: number = 0;
  pages: Array<number>;
  //displayedColumns: string[] = ['nom', 'prenom', 'email', 'filiere', 'genre', 'organisme', 'dateInscription'];
  columnsToDisplay: string[] = ['nom', 'prenom', 'filiere', 'promotion', 'genre', 'nomorganisme', 'secteur', 'email', 'dateInscription'];



  Secteurs = ['prive', 'public'];
  Filieres = ['GI','SIG','GC','GE','IVE','IHE','Meteo'];
  Promotions :Array<number> = new Array<number>();



  toppings = new FormControl();


  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filiere :string;
  promotion :string;
  secteur :string;
  genre :string;
  province :string;
  organisme :string;

  //pageLaureats: {content:[]};

  constructor(public  httpClient: HttpClient,
              public organismeService: OrganismesServices,
              public laureatservice: LaureatsServices,
              public router: Router) {

    this.organismesListSubscription = this.organismeService.organismeList$.subscribe(
      (organismes) => {
        this.organismesList = organismes;
      }
    );


    this.laureatsListSubscription = this.laureatservice.laureatsList$.subscribe(
      (laureatsImported: any[]) => {

        console.log(laureatsImported);
        this.laureatsList = laureatsImported;

        this.dataSource = new MatTableDataSource<Laureat>(this.laureatsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log("le datasource :");
        console.log(this.dataSource);


      }
    );



  }


  ngOnInit() {
    this.genre=""; this.filiere=""; this.province=""; this.organisme=""; this.secteur=""; this.promotion="";this.quota=2;
    for (let i = 1974; i < 2020; i++) {
      this.Promotions.push(i);
    }
    this.Promotions.reverse();
  }

  doSearch() {


    this.laureatservice.nouveauFiltre(this.genre,this.filiere,this.province,this.organisme,this.secteur,this.promotion,this.quota);



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

export class Organisme {
  name: string;
  secteur: string;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
