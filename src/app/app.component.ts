import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Subscription} from 'rxjs';
import {AuthentificationServices} from '../services/authentification.services';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentUserSubscription : Subscription;
  public currentUser: any;

  title = 'Ng-Teams';
  loading = false;

  constructor(public authentificationServices:AuthentificationServices, public router:Router) {


    console.log(this.currentUser);
    this.router.events.subscribe((event: Event) => {


      switch (true) {
        case event instanceof NavigationStart: {

          console.log("NavigationStart");

          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {

          console.log("NavigationError or NavigationCancel or NavigationEnd");

          this.loading = false;
          break;
        }
        default: {
          console.log("Navigation unknown");

          break;
        }
      }
    });

    this.authentificationServices.emit();

    this.currentUserSubscription = this.authentificationServices.currentAuthentified$.subscribe(data => {

      this.currentUser = data;
      console.log(this.currentUser);



    });



  }

  public logout()
  {

    this.authentificationServices.desauthentification();

  }



}
