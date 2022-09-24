
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/Services/general-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-tarifario-list-internacional',
  templateUrl: './tarifario-list-internacional.component.html',
  styleUrls: ['./tarifario-list-internacional.component.css']
})
export class TarifarioListInternacionalComponent implements OnInit {


  tarifarios!: Array<any>; //Lista de tarifarios
  operadoras!: Array<any>; //Lista de tarifarios
  grupos!: Array<any>; //Lista de tarifarios
  horarios!: Array<any>; //Lista de tarifarios
  isValidFormSubmitted!: boolean;
  tarifarioFormInternacional!: FormGroup;
  button_Name: any;
  dataForUpdate!: any;
  dataForDelete!: any;
  page = 1;
  params !: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  count = 0;
  pageSize = 10;
  pageSizes = [3, 6, 9];
  numberPagination !: number; //Numero de paginação
  numeros!: Array<any>; //lista de extenssões
  valorTaxa!: any;


  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.tarifarioFormInternacional = this._formBuilder.group({

      grupo: [['c41f0476-a458-4751-ab10-e8f716cad5be'], [Validators.required]],
      horario: [['2c984e18-c55b-4758-b00e-098c1a4bbb67'], [Validators.required]],
      temIva: [[1], [Validators.required]],
      valorr: [0, [Validators.required]]
  });


    this.GetAllTarifario(); //Get All Tarifario
   // this.GetAllOperadoras(); //Trazer todas as operadoras
    this.GetAllGrupo();
    this.GetAllHorarioChamada();
  }

  GetAllTarifario()
  {

    let filtro = {

      pageNumber: 0,
      pageSize: 10
    }

    this.service.postter('TaxaPrefixoInternacional/Pagination', filtro).subscribe(
      (res) => {

         //console.log(res);
         this.tarifarios = res.data;
         this.numberPagination = res.totalPage; //Numero total de paginas
         this.count = res.totalItems;

        // this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      }, (error) => {
        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      });
  }


  GetAllGrupo()
  {
    this.service.getter('GrupoPrefixo').subscribe(
      (res) => {

         //console.log(res);
         this.grupos = res.data;
        // this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      }, (error) => {
        //console.log(error)
        //this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      });
  }

  GetAllHorarioChamada()
  {
    this.service.getter('HorarioChamada').subscribe(
      (res) => {

         //console.log(res);
         this.horarios = res.data;
        // this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      }, (error) => {
        //console.log(error)
        //this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      });
  }


//Mostrar o modal de termos e condições
showDialog(idModal: any, intecion: any){


  this.button_Name = "Salvar";

  this.tarifarioFormInternacional.reset(); //Fazer reset do formulario
  this.tarifarioFormInternacional.controls['grupo'].setValue('c41f0476-a458-4751-ab10-e8f716cad5be');
  this.tarifarioFormInternacional.controls['horario'].setValue('2c984e18-c55b-4758-b00e-098c1a4bbb67');
  this.tarifarioFormInternacional.controls['temIva'].setValue(1);
  this.tarifarioFormInternacional.controls['valorr'].setValue(0);

  if(intecion == 'add')
     this.button_Name = "Salvar";
  else
     this.button_Name = 'Actualizar'

}

RegistarTarifario()
{

  //Mostrar o loader na tela
  this.spinner.show();



  this.isValidFormSubmitted = true;
  if (!this.tarifarioFormInternacional.valid) {
      return;
  }

  this.isValidFormSubmitted = false;


  let addtaxaOperadora = {

    idGrupoPrefixo: this.tarifarioFormInternacional.value.grupo,
    idHorarioChamada: this.tarifarioFormInternacional.value.horario,
    temIva: this.tarifarioFormInternacional.value.temIva == 1 ? true : false,
    valor: this.tarifarioFormInternacional.value.valorr
}


if(this.button_Name === 'Salvar')
{
    this.service.postter('TaxaPrefixoInternacional/register', addtaxaOperadora).subscribe(
      (res) => {

        // console.log(res);
        //this.GetAllOperadoras(); //Chamar a lista de operadoras
        this.GetAllTarifario(); //Chamar a lista de tarifarios
        this.tarifarioFormInternacional.reset(); //Fazer reset do formulário
        this.toastr.success('Tarifario adicionado com sucessos', 'Tarifario');


        this.spinner.hide();

      }, (error) => {


        this.toastr.error('Ocorreu um erro ao tentar adicionar o tarifario', 'Tarifario');
        this.spinner.hide();

      });
}else
{
      let updateOperadora =
      {
        idTaxaPrefixoInternacional: this.dataForUpdate.idTaxaPrefixoInternacional,
        idGrupoPrefixo: this.tarifarioFormInternacional.value.grupo,
        idHorarioChamada: this.tarifarioFormInternacional.value.horario,
        temIva: this.tarifarioFormInternacional.value.temIva == 1 ? true : false,
        valor: this.tarifarioFormInternacional.value.valorr
      }



      this.service.updatter('TaxaPrefixoInternacional/update', updateOperadora).subscribe(
        (res) => {

          // console.log(res);
          //this.GetAllOperadoras(); //Chamar a lista de operadoras
          this.GetAllTarifario();
          this.tarifarioFormInternacional.reset(); //Fazer reset do formulário
          this.button_Name = 'Salvar';
          this.toastr.success('Tarifário actualizada com sucessos', 'Tarifário');

          this.spinner.hide();

        }, (error) => {

          this.toastr.error('Ocorreu um erro ao tentar actualizar o tarifário', 'Tarifário');
          this.spinner.hide();

        });

}


}


UpdateTarifario(Id: any)
{

  this.button_Name = 'Actualizar';

  var dataFind = this.tarifarios.find(o => o.idTaxaPrefixoInternacional === Id);
  this.dataForUpdate = dataFind;

  this.tarifarioFormInternacional.reset(); //Fazer reset do formulario


  this.tarifarioFormInternacional.controls['valorr'].setValue(dataFind.valor);
  this.tarifarioFormInternacional.controls['grupo'].setValue(dataFind.grupoPrefixo.idGrupoPrefixo);
  this.tarifarioFormInternacional.controls['horario'].setValue(dataFind.horarioChamada.idHorarioChamada);
  this.tarifarioFormInternacional.controls['temIva'].setValue(dataFind.temIva == true ? 1 : 0);
  this.tarifarioFormInternacional.controls['mesmaRede'].setValue(dataFind.mesmaRede == true ? 1 : 0);

}

DeleteTarifario()
{


  this.spinner.show();

  var dataFind = this.tarifarios.find(o => o.idTaxaPrefixoInternacional === this.dataForDelete.idTaxaPrefixoInternacional);

  let deletetaxaOperadora = {

    idTaxaPrefixoInternacional: dataFind.idTaxaPrefixoInternacional,
    idGrupoPrefixo: dataFind.idGrupoPrefixo,
    idHorarioChamada: dataFind.idHorarioChamada,
    temIva: dataFind.temIva,
    valor: dataFind.valor
}


this.service.postter('TaxaPrefixoInternacional/delete', deletetaxaOperadora).subscribe(
  (res) => {

    this.GetAllTarifario();
    this.toastr.success('Tarifário eliminada com sucessos', 'Tarifário');

    this.spinner.hide();


  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar o tarifário', 'Tarifário');
    this.spinner.hide();

  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.tarifarios.find(o => o.idTaxaPrefixoInternacional === id);
    this.dataForDelete = dataFind;
}

handlePageChange(pageNumber: any): void {

  this.spinner.show();

  this.page = pageNumber;

  let filtro = {

    pageNumber: pageNumber,
    pageSize: 10
  }


  this.service.postter('TaxaPrefixoInternacional/Pagination', filtro).subscribe(
    (res) => {

      // console.log(res);
       this.tarifarios = res.data;
       this.numberPagination = res.totalPage; //Numero total de paginas
       this.count = res.totalItems;
       this.spinner.hide();

    }, (error) => {

      //console.log(error)
      this.toastr.error('Ocorreu um erro ao tentar filtrar o tarifário', 'Tarifário');
      this.spinner.hide();

    });


}


}

