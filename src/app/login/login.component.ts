import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthentificationServices} from '../../services/authentification.services';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

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

  constructor(public authentificationServices:AuthentificationServices, public snackBar: MatSnackBar) {

    this.authentificationServices.emit();
    this.currentUserSubscription = this.authentificationServices.currentAuthentified$.subscribe(data => {

      this.currentUser = data;
      console.log(data);
      })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getErrorMessage() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
      this.emailControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(){
    this.authentificationServices.authentification(this.email,this.password);
    let him  = this.authentificationServices.getCurrentAuthentified();
    if ( him != null){
      this.openSnackBar("CMohamed", "Welcome");
    }else{
      //this.email='';
      //this.password='';
      this.openSnackBar("email or pass is ", "Wrong");
    }
  }




  ngOnInit() {
  }

}
