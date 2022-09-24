import { Component, OnInit } from '@angular/core';
import { call } from 'src/app/Models/call';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agent } from 'src/app/Models/agent';
import { TipoChamada } from 'src/app/Models/tipoChamada';
import { ToastrService } from 'ngx-toastr';
import { ExcelServiceService } from 'src/app/Services/excel-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Utilizador } from 'src/app/Models/utilizador';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Projecto } from 'src/app/Models/projecto';

@Component({
  selector: 'app-manutencao-list',
  templateUrl: './manutencao-list.component.html',
  styleUrls: ['./manutencao-list.component.css']
})
export class ManutencaoListComponent implements OnInit {



  Calls!: Array<any>; //Lista de chamadas
  CallsReport!: Array<any>; //Lista de chamadas para fazer report
  Agents!: Array<any>;  //Lista de agents
  TCalls!: Array<any>; //Lista de tipos de chamada
  Projectos!: Array<any> //Lista de tipos de projecto
  numberPagination !: number; //Numero de paginação
  filterForm!: FormGroup;
  manutencaoForm!: FormGroup;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  params !: any;
  DATA!: any;
  TotalCustomCall!: any;
  TotalTimeCallDuration!: any;
  TotalItemsCurrentPage!: any;
  isValidFormSubmitted = false;
  button_Name!: any;

  dropdownList = [];
  selectedItems: any [] = [];
  dropdownSettings:IDropdownSettings={};

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];

  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private _excelServiceService: ExcelServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService  ) { }

  ngOnInit(): void {


    this.dropdownSettings = {
      idField: 'idProjecto',
      textField: 'descricao',
      enableCheckAll: true,
      selectAllText: "Selecionar todos os projectos",
      unSelectAllText: "Deselecionar todos os projectos",
    };


    this.button_Name = 'Registar';
    this.filterForm = this._formBuilder.group({

      numero: ['', [Validators.required]],
      estadoId: [[''], [Validators.required]],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]

  });

  this.manutencaoForm = this._formBuilder.group({

    projecto: [[''], [Validators.required]],
    assunto: ['', Validators.required],
    descricao: ['', Validators.required]
});

    this.GetAllManutencoes(); //Trazer todos as chamadas
    this.GetAllAgent(); //Trazer todos os agents
    this.GetAllTipodeChamada(); //Trazer todos os tipos de chamadas
    this.GetAllProjectos();
  }


  GetAllManutencoes()
  {


       var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson) as string;
       var dataJson = JSON.parse(data) as Utilizador;
       var dataFind = dataJson.unidades.length
       var unidade = dataJson.unidades[0]
       //Validar se o utilizador que está logado é de uma unidade ou da hanzolo

       if(dataFind > 0) //Utilizador da agência
       {
           this.service.getter('Manutencao/ByUnidade?IdUnidade=' + unidade.idUnidade + '&PageNumber=1&PageSize=10').subscribe(
          (res) => {

             this.Calls = res.data;
             this.numberPagination = res.totalPage; //Numero total de paginas
             this.count = res.totalItems;
             this.TotalCustomCall = res.totalCustomCall;
             this.TotalTimeCallDuration = res.totalTimeDurationCall;
             this.TotalItemsCurrentPage = res.totalCurrentDataPage;

          }, (error) => {
            //console.log(error)
            this.toastr.error('Ocorreu um erro ao tentar mostrar as manutenções, tentar mais tarde', 'Manutenções');

          });
       }
       else
       {


       }

  }

//Carregar a lista de Agents
GetAllAgent() {

  this.service.getter('Agent').subscribe(
    res => {
      this.Agents  = res.data; //Fazer o set de dados
    }
  )
}

GetAllProjectos() {

  this.service.getter('Projecto').subscribe(
    res => {
      this.Projectos  = res.data; //Fazer o set de dados
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



  var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson) as string;
  var dataJson = JSON.parse(data) as Utilizador;
  var dataFind = dataJson.unidades.length
  var unidade = dataJson.unidades[0]
  //Validar se o utilizador que está logado é de uma unidade ou da hanzolo

  if(dataFind > 0) //Utilizador da agência
  {
      this.service.getter('Manutencao/ByUnidade?IdUnidade=' + unidade.idUnidade + '&PageNumber=' + pageNumber + '&PageSize=10').subscribe(
     (res) => {

       // console.log(res);
        this.Calls = res.data;
        this.numberPagination = res.totalPage; //Numero total de paginas
        this.count = res.totalItems;
        this.TotalCustomCall = res.totalCustomCall;
        this.TotalTimeCallDuration = res.totalTimeDurationCall;
        this.TotalItemsCurrentPage = res.totalCurrentDataPage;

        this.spinner.hide();

     }, (error) => {

      this.spinner.hide();
       this.toastr.error('Ocorreu um erro ao tentar mostrar as manutenções, tentar mais tarde', 'Manutenções');

     });
  }
  else
  {


  }



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

onItemSelect(item: any) {

  this.selectedItems.push(item);
}
onSelectAll(items: any[]) {

  this.selectedItems.length = 0; //Remover todos os items da lista
  for (let item of items) {
    this.selectedItems.push(item)
}


}

onUnSelectAll() {
   this.selectedItems.length = 0; //Remover todos os items da lista
}

onItemDeSelect(items: any) {

  var deselected = this.selectedItems.find( o => o.idProjecto == items.idProjecto);
  var index = this.selectedItems.indexOf(deselected);
  this.selectedItems.splice(index, 1); //Eliminar o tem do array
}

RegistarManutencao()
{

  var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson) as string;
  var dataJson = JSON.parse(data) as Utilizador;
  var dataFind = dataJson.unidades.length
  var unidade = dataJson.unidades[0]
  //Validar se o utilizador que está logado é de uma unidade ou da hanzolo



    this.isValidFormSubmitted = true;
    if (!this.manutencaoForm.valid) {
        return;
    }

    this.isValidFormSubmitted = false;


        //Mostrar o loader na tela
        this.spinner.show();


  if(dataFind > 0) //Utilizador da agência
  {


    let addManutencao = {

      dataRegisto: "2022-04-23T05:07:15.2815884",
      dataResolucao: null,
      assunto: this.manutencaoForm.value.assunto,
      descricao: this.manutencaoForm.value.descricao,
      idEstadoManutencao: "2cbd16cd-0a56-482d-aa42-cfda738ac9a6",
      idUnidade: unidade.idUnidade,
      idUser: dataJson.id,
      idOrigemManutencao: null,
      idPrestador: null,
      projectoManutencao: this.selectedItems
  }

      this.service.postter('Manutencao/register/All', addManutencao).subscribe(
     (res) => {

           //Mostrar o loader na tela
           this.spinner.hide();
           this.manutencaoForm.reset(); //Fzer redet no formulário
           this.toastr.success('Manutenção registada com sucesso', 'Manutenção');

     }, (error) => {
       //console.log(error)
       this.spinner.hide();
       this.toastr.error('Ocorreu um erro ao tentar registar a manutenção, tentar mais tarde', 'Manutenção');

     });
  }
  else
  {


  }
}

SeeManutencaoDetail(Id: any)
{
     var data = this.Calls.find(x => x.idManutencao == Id);
    var JsonData = JSON.stringify(data);
    localStorage.removeItem("ManutencaoDetail");
    localStorage.setItem("ManutencaoDetail", JsonData);
}


}
