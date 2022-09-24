import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-numero-isento-list',
  templateUrl: './numero-isento-list.component.html',
  styleUrls: ['./numero-isento-list.component.css']
})
export class NumeroIsentoListComponent implements OnInit {


  numeros!: Array<any>; //lista de extenssões
  isValidFormSubmitted!: boolean;
  numeroForm!: FormGroup;
  pesquisarForm!: FormGroup;
  numberPagination !: number; //Numero de paginação
  modal_t: any;
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

  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {


    this.numeroForm = this._formBuilder.group({
      numero: ['', [Validators.required]],
    });



    this.pesquisarForm = this._formBuilder.group({

      number: ['', [Validators.required]]
});

    this.GetAllNumero(); //Trazer todos os números
  }

  GetAllNumero()
  {

    let filtro = {

      pageNumber: 0,
      pageSize: 10
    }

    this.service.postter('NumberIsento/pagination', filtro).subscribe(
      (res) => {

         this.numeros = res.data;
         this.numberPagination = res.totalPage; //Numero total de paginas
         this.count = res.totalItems;

      }, (error) => {

        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar mostrar os numero isento, tentar mais tarde', 'Numeros Isento');

      });
  }

  handlePageChange(pageNumber: any): void {

    this.spinner.show();

    this.page = pageNumber;

    let filtro = {

      pageNumber: pageNumber,
      pageSize: 10
    }


    this.service.postter('NumberIsento/pagination', filtro).subscribe(
      (res) => {

        // console.log(res);
         this.numeros = res.data;
         this.numberPagination = res.totalPage; //Numero total de paginas
         this.count = res.totalItems;

         this.spinner.hide();

      }, (error) => {

        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar mostrar os numero isento, tentar mais tarde', 'Numeros Isento');
        this.spinner.hide();

      });


  }


//Mostrar o modal de termos e condições
showDialog(idModal: any, intecion: any){


  this.numeroForm.reset(); //Fazer reset do formulario
  // this.tarifarioForm.controls['operadora'].setValue('12f43bb4-4fde-4391-b802-800547362059');
  // this.tarifarioForm.controls['temIva'].setValue(1);
  // this.tarifarioForm.controls['mesmaRede'].setValue(1);
  // this.tarifarioForm.controls['valor'].setValue(0.00);

  if(intecion == 'add')
     this.button_Name = "Salvar";
  else
     this.button_Name = 'Actualizar'

}


RegistarNumero()
{

   //Mostrar o loader na tela
   this.spinner.show();


  this.isValidFormSubmitted = true;
  if (!this.numeroForm.valid) {
      return;
  }

  this.isValidFormSubmitted = false;


  let addNumero = {

    descricao: this.numeroForm.value.numero,
}


if(this.button_Name === 'Salvar')
{
    this.service.postter('NumberIsento/register', addNumero).subscribe(
      (res) => {

        // console.log(res);
        //this.GetAllOperadoras(); //Chamar a lista de operadoras
        this.GetAllNumero(); //Chamar a lista de tarifarios
        this.numeroForm.reset(); //Fazer reset do formulário
        this.toastr.success('Numero adicionado com sucessos', 'Número');

        this.spinner.hide();

      }, (error) => {


        this.toastr.error('Ocorreu um erro ao tentar adicionar o Número', 'Número');
        this.spinner.hide();

      });
}else
{
      let updateNumero =
      {
        id: this.dataForUpdate.id,
        descricao: this.numeroForm.value.numero,
      }

      this.service.updatter('NumberIsento/update', updateNumero).subscribe(
        (res) => {

          // console.log(res);
          //this.GetAllOperadoras(); //Chamar a lista de operadoras
          this.GetAllNumero();
          this.numeroForm.reset(); //Fazer reset do formulário
          this.button_Name = 'Salvar';
          this.toastr.success('Número actualizada com sucessos', 'Número');

          this.spinner.hide();

        }, (error) => {

          this.toastr.error('Ocorreu um erro ao tentar actualizar a número', 'Número');
          this.spinner.hide();

        });

}


}


UpdateNumero(Id: any)
{

  this.button_Name = 'Actualizar';
  var dataFind = this.numeros.find(o => o.id === Id);
  this.dataForUpdate = dataFind;
  this.numeroForm.controls['numero'].setValue(dataFind.descricao);
}

DeleteNumero()
{


  this.spinner.show();

  var dataFind = this.numeros.find(o => o.id === this.dataForDelete.id);

  let deletetaNumero = {

    id: dataFind.id,
    descricao: dataFind.descricao
}

this.service.postter('NumberIsento/delete', deletetaNumero).subscribe(
  (res) => {

    this.GetAllNumero();
    this.toastr.success('Número eliminada com sucessos', 'Número');
    this.spinner.hide();

  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar o numero', 'Número');
    this.spinner.hide();

  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.numeros.find(o => o.id === id);
    this.dataForDelete = dataFind;
}


PesquisarExtensao()
{

  this.spinner.show();

  var numberForFilter = this.pesquisarForm.value.number;

  let filtro = {


    number: numberForFilter,
    filter: {

    pageNumber: 0,
    pageSize: 10

    }

  }

  this.service.postter('NumberIsento/filter', filtro).subscribe(
    (res) => {

       this.numeros = res.data;
       this.numberPagination = res.totalPage; //Numero total de paginas
       this.count = res.totalItems;

       this.spinner.hide();

    }, (error) => {

      //console.log(error)
      this.toastr.error('Ocorreu um erro ao tentar mostrar os numero isento, tentar mais tarde', 'Números Isento');
      this.spinner.hide();
    });


}






}


