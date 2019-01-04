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
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';
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
  public Filieres = []; //c'est une lsite qui ocntiendra le nom des filiere abrégé
  public Provinces =[];

  motCle: string = "";
  size: number = 4;
  quota = 2; //c'est le nombre maximal d'enregistrements qu'on peut récupérer à partir d'une requet http
  currentPage: number = 0;
  pages: Array<number>;
  //displayedColumns: string[] = ['nom', 'prenom', 'email', 'filiere', 'genre', 'organisme', 'dateInscription'];
  columnsToDisplay: string[] = ['nom', 'prenom', 'filiere', 'promotion', 'genre', 'nomorganisme', 'secteur', 'email', 'dateInscription'];



  Secteurs = ['prive', 'public'];

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

    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20abreviationfiliere%20as%20nomfiliere%20" +
      "from%20filieres")
      .subscribe( (data) => {

          this.Filieres =[];

          for(let i = 0; i< (data as any).features.length;i++){
            this.Filieres.push((data as any).features[i].nomfiliere);
          }

    }, (err) => {

    });

    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20nom_provin%20as%20nomprovince%20" +
      "from%20provinceswgs")
      .subscribe( (data) => {

        this.Provinces =[];

        for(let i = 0; i< (data as any).features.length;i++){
          this.Provinces.push((data as any).features[i].nomprovince);
        }

      }, (err) => {

      });



    this.organismesListSubscription = this.organismeService.organismeList$.subscribe(
      (organismes) => {
        this.organismesList = organismes;
      }
    );


    this.laureatsListSubscription = this.laureatservice.laureatsList$.subscribe(
      (laureatsImported: any[]) => {

        //console.log(laureatsImported);
        this.laureatsList = laureatsImported;

        this.dataSource = new MatTableDataSource<Laureat>(this.laureatsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        //console.log("le datasource :");
        //console.log(this.dataSource);


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

  annuler() {
    this.genre=""; this.filiere=""; this.province=""; this.organisme=""; this.secteur=""; this.promotion="";this.quota=2;


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

