import { Component, OnInit } from '@angular/core';
import { call } from 'src/app/Models/call';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/Models/agent';
import { TipoChamada } from 'src/app/Models/tipoChamada';
import { ToastrService } from 'ngx-toastr';
import { ExcelServiceService } from 'src/app/Services/excel-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-interacao-list',
  templateUrl: './interacao-list.component.html',
  styleUrls: ['./interacao-list.component.css']
})

export class InteracaoListComponent implements OnInit {


  Calls!: Array<call>; //Lista de chamadas
  CallsReport!: Array<call>; //Lista de chamadas para fazer report
  Agents!: Array<Agent>;  //Lista de agents
  TCalls!: Array<TipoChamada>; //Lista de tipos de chamada
  numberPagination !: number; //Numero de paginação
  filterForm!: FormGroup;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  params !: any;
  DATA!: any;
  TotalCustomCall!: any;
  TotalTimeCallDuration!: any;
  TotalItemsCurrentPage!: any;

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private _excelServiceService: ExcelServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {


    this.filterForm = this._formBuilder.group({

      agentId: [[''], [Validators.required]],
      estadoId: [[''], [Validators.required]],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]

  });

    this.GetAllCalls(); //Trazer todos as chamadas
    this.GetAllAgent(); //Trazer todos os agents
    this.GetAllTipodeChamada(); //Trazer todos os tipos de chamadas

  }


  GetAllCalls()
  {
    //Regsitar o pedido
    // var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson); //Buscar os dados do local storage
    // var dado = JSON.parse(data as string);

    let filtro = {

      extensao: null,
      minDate: null,
      maxDate: null,
      callType: null,
      paginationFilter:{pageNumber: 0, pageSize: 10}
    }


    this.service.postter('calls/filtro', filtro).subscribe(
      (res) => {

        // console.log(res);
         this.Calls = res.data;
         this.numberPagination = res.totalPage; //Numero total de paginas
         this.count = res.totalItems;
         this.TotalCustomCall = res.totalCustomCall;
         this.TotalTimeCallDuration = res.totalTimeDurationCall;
         this.TotalItemsCurrentPage = res.totalCurrentDataPage;

      }, (error) => {
        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar mostrar as interações, tentar mais tarde', 'Interações');

      });


  }

//Carregar a lista de Agents
GetAllAgent() {

  this.service.getter('Agent').subscribe(
    res => {
      this.Agents  = res.data; //Fazer o set de dados
    }
  )
}

//Carregar a lista de tipo de chamadas
GetAllTipodeChamada() {

  this.service.getter('TipoChamada').subscribe(
    res => {
      this.TCalls  = res.data; //Fazer o set de dados
    }
  )
}

onSubmit(){


    //Mostrar o loader na tela
    this.spinner.show();

  let filtro = {

    extensao: this.empty(this.filterForm.value.agentId) ? null : this.filterForm.value.agentId,
    callType: this.empty( this.filterForm.value.estadoId) ? null :  this.filterForm.value.estadoId,
    minDate: this.empty(this.filterForm.value.dataInicio) ? null :  this.filterForm.value.dataInicio,
    maxDate: this.empty(this.filterForm.value.dataFim) ? null :  this.filterForm.value.dataFim,
    paginationFilter: {pageNumber: 0, pageSize: 0}
  }


  this.service.postter('calls/filtro', filtro).subscribe(
    (res) => {

       this.Calls = res.data;
       this.numberPagination = res.totalPage; //Numero total de paginas
       this.count = res.totalItems;
       this.TotalCustomCall = res.totalCustomCall;
       this.TotalTimeCallDuration = res.totalTimeDurationCall;
       this.TotalItemsCurrentPage = res.totalCurrentDataPage;

               //Fechar o Loader
               this.spinner.hide();


    }, (error) => {

              //Fechar o Loader
              this.spinner.hide();

              this.toastr.error('Ocorreu um erro ao tentar filtrar as interações', 'Interações');
    });

console.log(filtro);

}

//Counger de paginação
  countPagination(num: number)
  {
     return new Array(num);
  }

 empty(str: string)
{
    if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "")
        return true;
    else
        return false;
}

handlePageChange(pageNumber: any): void {


  this.spinner.show();


  this.page = pageNumber;

  let filtro = {

    extensao: this.empty(this.filterForm.value.agentId) ? null : this.filterForm.value.agentId,
    callType: this.empty( this.filterForm.value.estadoId) ? null :  this.filterForm.value.estadoId,
    minDate: this.empty(this.filterForm.value.dataInicio) ? null :  this.filterForm.value.dataInicio,
    maxDate: this.empty(this.filterForm.value.dataFim) ? null :  this.filterForm.value.dataFim,
    paginationFilter: {pageNumber: pageNumber, pageSize: 10}
  }


  this.service.postter('calls/filtro', filtro).subscribe(
    (res) => {


       this.Calls = res.data;
       this.numberPagination = res.totalPage; //Numero total de paginas
       this.TotalCustomCall = res.totalCustomCall;
       this.TotalTimeCallDuration = res.totalTimeDurationCall;
       this.TotalItemsCurrentPage = res.totalCurrentDataPage;

       this.spinner.hide();


    }, (error) => {

      this.spinner.hide();
       this.toastr.error('Ocorreu um erro ao tentar filtrar as interações', 'Interações');

    });


}

handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  //Sthis.page = 1;
  //this.retrieveTutorials();

  console.log('handlePageSizeChange' + event)
}

getRequestParams(searchTitle: any, page: any, pageSize: any): any {
  // tslint:disable-next-line:prefer-const


  if (searchTitle) {
    this.params[`title`] = searchTitle;
  }

  if (page) {
    this.params[`page`] = page - 1;
  }

  if (pageSize) {
    this.params[`size`] = pageSize;
  }

  return this.params;
}

retrieveTutorials(): void {
  const params = this.getRequestParams(this.title, this.page, this.pageSize);
 // console.log(params);
}

public ExportToExcelReport():void {


  //Mostrar o loader na tela
  this.spinner.show();

  let filtro = {

    extensao: this.empty(this.filterForm.value.agentId) ? null : this.filterForm.value.agentId,
    callType: this.empty( this.filterForm.value.estadoId) ? null :  this.filterForm.value.estadoId,
    minDate: this.empty(this.filterForm.value.dataInicio) ? null :  this.filterForm.value.dataInicio,
    maxDate: this.empty(this.filterForm.value.dataFim) ? null :  this.filterForm.value.dataFim,
    paginationFilter: {pageNumber: 0, pageSize: 0}
  }


  console.log(filtro)

  this.service.postter('calls/report', filtro).subscribe(
    (res) => {

       this.CallsReport = res.data;
        this._excelServiceService.exportAsExcelFile(this.CallsReport, 'Relatório Interações_' + Date.now(), res.totalItems, res.totalTimeDurationCall, res.totalCustomCall);

        //Fechar o Loader
        this.spinner.hide();

    }, (error) => {

      //Fechar o Loader
      this.spinner.hide();
      //console.log(error)
      this.toastr.error('Ocorreu um erro ao tentar exportar o relatório', 'Relatório');

    });

}



}








