import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthentificationServices} from '../../services/authentification.services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public currentUserSubscription : Subscription;
  public currentUser: any;


  public email;
  public password;

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  hide = true;


  constructor(public authentificationServices:AuthentificationServices) {

    this.authentificationServices.emit();
    this.currentUserSubscription = this.authentificationServices.currentAuthentified$.subscribe(data => {

      this.currentUser = data;
      console.log(data);

      })


  }

  getErrorMessage() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
      this.emailControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(){
    this.authentificationServices.authentification(this.email,this.password)
  }




  ngOnInit() {
  }

}
