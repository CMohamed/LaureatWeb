import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nouveau-laureat',
  templateUrl: './nouveau-laureat.component.html',
  styleUrls: ['./nouveau-laureat.component.css']
})
export class NouveauLaureatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSaveLaureat(dataForm) {
    console.log(dataForm);
  }

}
