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

          let symbol;

          if(this.laureatsList[i].photo != "" && this.laureatsList[i].photo != null){

            symbol= {
              type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
              //url : "data:image/jpeg;base64,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",
              url:this.laureatsList[i].photo,
              width: "30px",
              height: "30px",
              xoffset:"2px",
              yoffset:"2px",
            };


          }
          else{

            symbol= {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [255, 0, 255],
              outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            };

          }








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
