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

  constructor(public httpClient: HttpClient) {

  }

  ngOnInit() {

    let chart;


    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20as%20y,%20filiere%20as%20label%20" +
      "from%20utilisateur%20" +
      "group%20by%20filiere").subscribe( data => {


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
            if(obj["label"] != ""){
              objIntermediaire["name"] = obj["label"];
            }
            else{
              objIntermediaire["name"] = "autre";
            }
            return objIntermediaire;
          })
        }]
      });

      chart.render();



    },err => {});


    this.httpClient.get("http://localhost:9090/requestAny/" +
      "select%20count(*)%20as%20y,%20genre%20as%20label%20" +
      "from%20utilisateur%20" +
      "group%20by%20genre").subscribe( data => {


      chart = new CanvasJS.Chart("chartContainer2", {
        animationEnabled: true,
        exportEnabled: true,
        axisY:{
          title: "Nombre inscrit"
        },
        axisX:{
          title: "Genre"
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






    let dataPoints = [];
    let y = 0;
    for ( var i = 0; i < 10000; i++ ) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y});
    }
    chart = new CanvasJS.Chart("chartContainer5", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Performance Demo - 10000 DataPoints"
      },
      subtitles:[{
        text: "Try Zooming and Panning"
      }],
      data: [
        {
          type: "line",
          dataPoints: dataPoints
        }]
    });

    chart.render();

  }

}
