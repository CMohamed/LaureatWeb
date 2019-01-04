import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LaureatsComponent } from './laureats/laureats.component';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {LaureatsServices} from 'src/services/laureats.services';
import {AvancementServices} from 'src/services/avancements.services';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewLaureatComponent } from './new-laureat/new-laureat.component';
import { NouveauLaureatComponent } from './nouveau-laureat/nouveau-laureat.component';
import { EditLaureatComponent } from './edit-laureat/edit-laureat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//nebular

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { MapComponent } from './map/map.component';
import {OrganismesServices} from '../services/organismes.service';
import { LoginComponent } from './login/login.component';
import {AuthentificationServices} from '../services/authentification.services';
import { AdminComponent } from './admin/admin.component';
import { AccueilComponent ,SafePipe} from './accueil/accueil.component';
import { LaureatDetaillesComponent } from './laureat-detailles/laureat-detailles.component';
import { HistoriqueLaureatComponent } from './historique-laureat/historique-laureat.component';
import { PhotoComponent } from './photo/photo.component';
import { StatistiqueLaureatComponent } from './statistique-laureat/statistique-laureat.component';


const appRoutes: Routes = [
  {path: 'accueil', component: AccueilComponent},
  {path: 'about', component: AboutComponent},
  {path: 'laureat-detailles', component: LaureatDetaillesComponent},
  {path: 'laureats', component: LaureatsComponent},
//  {path: 'new-laureat', component: NewLaureatComponent},
  {path: 'new-laureat', component: NouveauLaureatComponent},
  {path: 'app-login', component: LoginComponent},
  {path: 'app-admin', component: AdminComponent},
  {path: 'editLaureat/:id', component: EditLaureatComponent},
  {path: 'statistique-laureat', component: StatistiqueLaureatComponent},
  { path: 'base64tourl/:base64', component: PhotoComponent },
  {
    path: '',
    redirectTo: '/accueil',
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
    EditLaureatComponent,
    MapComponent,
    LoginComponent,
    AdminComponent,
    AccueilComponent,
    SafePipe,
    LaureatDetaillesComponent,
    HistoriqueLaureatComponent,
    PhotoComponent,
    StatistiqueLaureatComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  providers: [LaureatsServices,
              OrganismesServices,
              AuthentificationServices,
              AvancementServices
  ],
  bootstrap: [AppComponent],
  exports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule
  ]
})
export class AppModule { }
