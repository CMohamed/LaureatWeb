import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';


import { loadModules } from 'esri-loader';


import {Subscription} from "rxjs";
import { LaureatsServices} from '../../services/laureats.services';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  @ViewChild('map') mapEl: ElementRef;LocateButton
  public currentLong = -7.5;
  public currentLat = 33.35;
  public erreur = 0;

  public laureatsListSubscription : Subscription;
  public laureatsList : any[];

  constructor(public laureatsServices : LaureatsServices) {


    this.getGeo();
    this.laureatsListSubscription = this.laureatsServices.laureatsList$.subscribe(
      (laureatsImported: any[]) => {

        console.log(laureatsImported);
        this.laureatsList = laureatsImported;
        console.log("this geo a commencé");
        this.getGeo();


      }
    );






  }

  async  getGeo() {

    // Reference: https://ionicframework.com/docs/api/platform/Platform/#ready

    // Load the ArcGIS API for JavaScript modules
    const [Map, MapView, Graphic,Locate]:any = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic',
      'esri/widgets/Locate'
    ])
      .catch(err => {
        console.error("ArcGIS: ", err);
      });

    console.log("Starting up ArcGIS map");


    let map = new Map({
      basemap: 'hybrid'
    });

    console.log("la map a bien été chargé");

    let mapView = new MapView({
      // create the map view at the DOM element in this component
      container: this.mapEl.nativeElement,
      center: [this.currentLong, this.currentLat],
      zoom: 6
    });

    mapView.map = map;


    if(this.laureatsList && this.laureatsList.length){
      console.log("----------------------------1---------------------------");
      console.log("-------------------------------------------------------");

      for(let i=0;i<this.laureatsList.length;i++) {
        console.log("---------------------2----------------------------------");



        if (this.laureatsList[i] && this.laureatsList[i].long && this.laureatsList[i].lat) {

          //console.log(this.laureatsList[i].photo);

          let symbol = {
            type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
            url: "http://www.leseco.ma/images/1619/EHTP.jpg",
            width: "64px",
            height: "64px"
          };


          let pointGraphic = new Graphic({
            geometry: {
              type: "point", // autocasts as new Point()
              longitude: Number(this.laureatsList[i].long),
              latitude:  Number(this.laureatsList[i].lat)
            },

            symbol : symbol

            /*
            symbol: {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [255, 0, 255],
              outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            }
            */
            ,
            attributes: {
              Nom: this.laureatsList[i].nom,
              Prenom: this.laureatsList[i].prenom,
              Organisme: this.laureatsList[i].nomorganisme,
              Filiere: this.laureatsList[i].filiere,
            },
            popupTemplate: {  // autocasts as new PopupTemplate()
              title: "{Nom} {Prenom}",
              content: [{
                type: "fields",
                fieldInfos: [{
                  fieldName: "Nom"
                }, {
                  fieldName: "Prenom"
                }, {
                  fieldName: "Organisme"
                }, {
                  fieldName: "Filiere"
                }]
              }]
            }


          });

          mapView.graphics.add(pointGraphic);


        }//fin if
      }

    }





    let locateBtn = new Locate({
      view: mapView
    });

    // Add the locate widget to the top left corner of the view
    mapView.ui.add(locateBtn, {
      position: "top-left"
    });


  }



  ngOnInit():void {
  }

}
