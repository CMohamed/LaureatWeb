import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Subscription} from 'rxjs';
import {AuthentificationServices} from '../services/authentification.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentUserSubscription : Subscription;
  public currentUser: any;

  constructor(public authentificationServices:AuthentificationServices, public router:Router) {

    this.authentificationServices.emit();
    this.currentUserSubscription = this.authentificationServices.currentAuthentified$.subscribe(data => {

      this.currentUser = data;
      console.log("---------- AppComponent consructor currentUser : ----------");
      console.log(data);
      console.log("-----------------------------------------------------------");

    })


  }




}
