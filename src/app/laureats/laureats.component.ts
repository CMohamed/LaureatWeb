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
  size: number = 5;
  currentPage: number = 0;
  pages: Array<number>;

  //pageLaureats: {content:[]};

  constructor(public  http: HttpClient, public laureatservice: LaureatsServices,
              public router: Router) { }

  ngOnInit() {
  }

  doSearch() {
    this.laureatservice.getLaureats(this.motCle, this.currentPage, this.size)
      .subscribe((data: any) => {
        this.pageLaureats = data;
        this.pages = new Array(data.totalPages);
        console.log(data.totalPages);
        console.log(data);
      }, err => {
        console.log(err);
      });
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
