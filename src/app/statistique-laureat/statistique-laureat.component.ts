import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import {HttpClient} from '@angular/common/http';
//var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-statistique-laureat',
  templateUrl: './statistique-laureat.component.html',
  styleUrls: ['./statistique-laureat.component.css']
})
export class StatistiqueLaureatComponent implements OnInit {

  public nombreDInscrit : number;
  public moyenneParMois : number;
  public nombreOrganisme : number;

  constructor(public httpClient: HttpClient) {

    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20" +
      "from%20utilisateur,%20avancement%20" +
      "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
      "and%20etat%20=%20'accept%C3%A9'").subscribe( data => {

        this.nombreDInscrit = Number((data as any).features[0].count);
        console.log(this.nombreDInscrit);
    });

      this.httpClient.get("http://localhost:9090/requestAny/" +
        "select%20count(*)%20as%20nombreInscription%20,%20(max(datetraitement)-min(datetraitement))%20as%20dureeSite%20" +
        "from%20utilisateur,%20avancement%20" +
        "where%20utilisateur.id%20=%20avancement.refutilisateur%20" +
        "and%20etat%20=%20'accept%C3%A9'").subscribe( data => {


        this.moyenneParMois = parseInt((Number((data as any).features[0].nombreinscription) / (Number((data as any).features[0].dureesite)/12)).toString());
        console.log(this.moyenneParMois);
      });



      this.httpClient.get("http://localhost:9090/requestAny/select%20count(*)%20as%20nombreorganisme%20" +
        "from%20organisme").subscribe( data => {


        this.nombreOrganisme = Number((data as any).features[0].nombreorganisme);

      });

  }

  ngOnInit() {


    let chart;


    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20as%20y,%20genre%20as%20label%20" +
      "from%20utilisateur%20" +
      "group%20by%20genre").subscribe( data => {

        console.log(data);

      chart = new CanvasJS.Chart("chartContainer1", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Nombre d'inscrit par filière"
        },

        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: (data as any).features.map( obj => {
            let objIntermediaire = {};
            objIntermediaire["y"] = Number(obj["y"]);
            objIntermediaire["name"] = obj["label"];

            return objIntermediaire;
          })
        }]
      });

      chart.render();



    },err => {});



    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20as%20y,%20filiere%20as%20label%20" +
      "from%20utilisateur%20" +
      "group%20by%20filiere").subscribe( data => {


      chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        theme: "light2",
        exportEnabled: true,
        axisY:{
          title: "Nombre inscrit",

        },
        axisX:{
          title: "Genre",
          titleFontSize: 20,
          labelFontSize: 14

        },
        title: {
          text: "Nombre d'inscrit selon le genre"
        },
        data: [{
          type: "column",
          dataPoints: (data as any).features.map( obj => {
            let objIntermediaire = {};
            objIntermediaire["y"] = Number(obj["y"]);

            objIntermediaire["label"] = obj["label"];
            return objIntermediaire;
          })
        }]
      });

      chart.render();

    },err => {});



    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20as%20y,%20organisme.secteur%20as%20label%20" +
      "from%20utilisateur,%20organisme%20where%20utilisateur.reforganisme%20=%20organisme.id%20" +
      "group%20by%20organisme.secteur").subscribe( data => {


      console.log(data);

      chart = new CanvasJS.Chart("chartContainer4", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Nombre d'inscrit par filière"
        },

        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: (data as any).features.map( obj => {
            let objIntermediaire = {};
            objIntermediaire["y"] = Number(obj["y"]);
            objIntermediaire["name"] = obj["label"];

            return objIntermediaire;
          })
        }]
      });

      chart.render();

    },err => {});


    this.httpClient.get("http://localhost:9090/requestAny/" +
      "(select%20count(*)%20as%20y,%20organisme.nomorganisme%20as%20label%20" +
      "from%20utilisateur,%20organisme%20" +
      "where%20utilisateur.reforganisme%20=%20organisme.id%20" +
      "group%20by%20organisme.nomorganisme%20" +
      "order%20by%20y%20desc%20" +
      "limit%204)").subscribe( data1 => {

        let data = [];
        data = data.concat((data1 as any).features);

      this.httpClient.get("http://localhost:9090/requestAny/" +
        "(select%20count(*)%20as%20y,%20'autre'%20as%20label%20" +
        "from%20utilisateur,%20organisme%20" +
        "where%20utilisateur.reforganisme%20=%20organisme.id%20" +
        "and%20organisme.nomorganisme%20not%20in%20" +
          "(select%20organisme.nomorganisme%20as%20label%20" +
          "from%20utilisateur,%20organisme%20" +
          "where%20utilisateur.reforganisme%20=%20organisme.id%20" +
          "group%20by%20organisme.nomorganisme%20" +
          "limit%204)%20)").subscribe( data2 => {

        data = data.concat((data2 as any).features);

        console.log(data);

        chart = new CanvasJS.Chart("chartContainer3", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: "Classement des organismes"
          },
          axisY:{
            title: "Nombre inscrit",

          },
          axisX:{
            title: "Organisme",
            titleFontSize: 20,
            labelFontSize: 14

          },
          data: [{
            type: "column",
            dataPoints: (data as any).map( obj => {
              let objIntermediaire = {};
              objIntermediaire["y"] = Number(obj["y"]);
              if(obj["label"] != ""){
                objIntermediaire["label"] = obj["label"];
              }
              else{
                objIntermediaire["label"] = "autre";
              }
              return objIntermediaire;
            })
          }]
        });

        chart.render();





      });






    },err => {});



    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20as%20y,%20promotion%20as%20x%20" +
      "from%20utilisateur%20" +
      "group%20by%20promotion%20" +
      "order%20by%20promotion%20asc").subscribe( data => {

      let dataPoints = [];
      let y = 0;


      console.log((data as any).features.map( obj => {
        let objIntermediaire = {};
        objIntermediaire["y"] = Number(obj["y"]);
        objIntermediaire["x"] = Number(obj["x"]);


        return objIntermediaire;
      }));

      console.log(dataPoints);
      chart = new CanvasJS.Chart("chartContainer5", {
        theme: "light2",
        zoomEnabled: true,
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Performance Demo - 10000 DataPoints"
        },
        subtitles:[{
          text: "Zoomez pour plus de détail"
        }],
        axisX:{
          title : "promotion",
          interval: 1,
          intervalType: "year",
          valueFormatString: "#"
        },
        axisY:{
          title : "nombre inscrit",
          intervalType: "number",
          valueFormatString: "#"
        },
        data: [
          {
            type: "line",
            dataPoints: (data as any).features.map( obj => {
              let objIntermediaire = {};
              objIntermediaire["y"] = Number(obj["y"]);
              objIntermediaire["x"] = Number(obj["x"]);


              return objIntermediaire;
            })
          }]
      });





      chart.render();



    }, err => {

    });




  }

}
