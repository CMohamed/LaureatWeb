import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LaureatsComponent } from './laureats/laureats.component';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {LaureatsServices} from 'src/services/laureats.services'
import {FormsModule} from '@angular/forms';
import { NewLaureatComponent } from './new-laureat/new-laureat.component';
import { NouveauLaureatComponent } from './nouveau-laureat/nouveau-laureat.component';
import { EditLaureatComponent } from './edit-laureat/edit-laureat.component';

const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'laureats', component: LaureatsComponent},
//  {path: 'new-laureat', component: NewLaureatComponent},
  {path: 'new-laureat', component: NouveauLaureatComponent},
  {path: 'editLaureat/:id', component: EditLaureatComponent},
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  }
];





@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LaureatsComponent,
    NewLaureatComponent,
    NouveauLaureatComponent,
    EditLaureatComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [LaureatsServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
