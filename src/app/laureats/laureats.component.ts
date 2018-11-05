import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LaureatsServices} from 'src/services/laureats.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-laureats',
  templateUrl: './laureats.component.html',
  styleUrls: ['./laureats.component.css']
})
export class LaureatsComponent implements OnInit {
  pageLaureats: any;
  motCle: string = "";
  size: number = 2;
  currentPage: number = 0;
  pages: Array<number>;

  public filiere = "";
  public promotion = "";
  public secteur = "";
  public genre = "";
  public province = "";
  public organisme = "";

  //pageLaureats: {content:[]};

  constructor(public  httpClient: HttpClient,
              public laureatservice: LaureatsServices,
              public router: Router) {




  }



  ngOnInit() {
  }






  doSearch() {



    let requeteFiltre = "http://localhost:9090/requestAny/select%20nom,email,prenom,photo,organisme.long,organisme.lat,filiere,promotion,organisme.secteur,genre,organisme.province,nomorganisme%20from%20utilisateur,organisme%20";
    let clauseWhere = "";

    console.log(this.secteur == "");

    if(this.filiere != ""){

      clauseWhere = clauseWhere + "filiere%20='" + this.filiere + "'%20and%20";


    }

    if(this.promotion != ""){

      clauseWhere = clauseWhere + "promotion%20='" + this.promotion + "'%20and%20";

    }

    if(this.secteur != "" ){

      clauseWhere = clauseWhere + "organisme.secteur%20='" + this.secteur + "'%20and%20";

    }

    if(this.genre != ""){

      clauseWhere = clauseWhere + "genre%20='" + this.genre + "'%20and%20";

    }


    if(this.province != ""){

      clauseWhere = clauseWhere + "organisme.province%20='" + this.secteur + "'%20and%20";

    }

    if(this.organisme != ""){

      clauseWhere = clauseWhere + "nomorganisme%20='" + this.organisme + "'%20and%20";

    }


    if(clauseWhere != ""){

      requeteFiltre = requeteFiltre + "where%20utilisateur.reforganisme=organisme.id%20and%20";

      requeteFiltre = requeteFiltre +clauseWhere.substring(0,clauseWhere.length-9);

    }
    else{
      requeteFiltre = requeteFiltre + "where%20utilisateur.reforganisme=organisme.id%20";

    }



    console.log(requeteFiltre);

    this.laureatservice.nouveauFiltre(requeteFiltre,this.currentPage,this.size)
      .subscribe( data => {

        this.pageLaureats = (data as any).features;
        console.log(this.pages);
        console.log((data as any).features);

        console.log(requeteFiltre.replace("select%20nom,email,prenom,photo,organisme.long,organisme.lat,filiere,promotion,organisme.secteur,genre,organisme.province,nomorganisme","select%20count(*)%20"));

        this.httpClient.get(requeteFiltre.replace("select%20nom,email,prenom,photo,organisme.long,organisme.lat,filiere,promotion,organisme.secteur,genre,organisme.province,nomorganisme","select%20count(*)%20"))
          .subscribe(data2 => {


            this.pages = new Array<number>(Number((data2 as any).features[0].count));

          });



      });




    /*
    this.laureatservice.getLaureats(this.motCle, this.currentPage, this.size)
      .subscribe((data: any) => {

        this.pageLaureats = data;
        this.pages = new Array(data.totalPages);
        console.log(data.totalPages);
        console.log(data);

      }, err => {

        console.log(err);

      });

      */

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
