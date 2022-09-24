import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manutencao-detail',
  templateUrl: './manutencao-detail.component.html',
  styleUrls: ['./manutencao-detail.component.css']
})
export class ManutencaoDetailComponent implements OnInit {


  Calls!: Array<any>;
  manutencao!: any;
  data!: any;

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.data = localStorage.getItem("ManutencaoDetail");
    var JsonData = JSON.parse(this.data);
    this.manutencao = JsonData;

  }

}
