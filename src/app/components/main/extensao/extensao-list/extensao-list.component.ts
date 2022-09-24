import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-extensao-list',
  templateUrl: './extensao-list.component.html',
  styleUrls: ['./extensao-list.component.css']
})
export class ExtensaoListComponent implements OnInit {


  extensoes!: Array<any>; //lista de extenssões
  isValidFormSubmitted!: boolean;
  extensaoForm!: FormGroup;
  pesquisarForm!: FormGroup;
  numberPagination !: number; //Numero de paginação
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
  valor1 = true;
  valor2 = false;

  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {


    this.extensaoForm = this._formBuilder.group({
      nome: ['', [Validators.required]],
      sobreNome: ['', [Validators.required]],
      extensao: ['0', [Validators.required]],
      sendMessage: [[1], [Validators.required]]
  });


     this.pesquisarForm = this._formBuilder.group({

      number: ['', [Validators.required]]
});
    this.GetAllExtenssoes(); //Get all extenssões
    //this.handlePageChange(1); //Get all extension
  }

  GetAllExtenssoes()
  {

    let filtro = {

      pageNumber: 0,
      pageSize: 10
    }

    this.service.postter('Agent/pagination', filtro).subscribe(
      (res) => {

       //  console.log(res);
         this.extensoes = res.data;
         this.numberPagination = res.totalPage; //Numero total de paginas
         this.count = res.totalItems;


      }, (error) => {

      //  console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar trazer as extensões, tentar mais tarde', 'Extensões');

      });
  }



handlePageChange(pageNumber: any): void {

  this.spinner.show();

  let filtro = {

    pageNumber: pageNumber,
    pageSize: 10
  }


  this.service.postter('Agent/pagination', filtro).subscribe(
    (res) => {

      // console.log(res);
       this.extensoes = res.data;
       this.page = pageNumber;
       this.count = res.totalItems;

       this.spinner.hide();

    }, (error) => {

     // console.log(error)
      this.toastr.error('Ocorreu um erro ao tentar trazer as extensões, tentar mais tarde', 'Extensões');
      this.spinner.hide();

    });


}


UpdateExtensao(Id: any)
{

  var dataFind = this.extensoes.find(o => o.idAgent === Id);
  this.dataForUpdate = dataFind;
  this.extensaoForm.controls['nome'].setValue(dataFind.firstName);
  this.extensaoForm.controls['sobreNome'].setValue(dataFind.lastName);
  this.extensaoForm.controls['extensao'].setValue(dataFind.extension);
  this.extensaoForm.controls['sendMessage'].setValue(dataFind.sendMessage);
}

ActualizarExtensao()
{

     //Mostrar o loader na tela
     this.spinner.show();

  let updateExtenssao =
  {
    idAgent: this.dataForUpdate.idAgent,
    extension: this.extensaoForm.value.extensao,
    firstName: this.extensaoForm.value.nome,
    lastName: this.extensaoForm.value.sobreNome,
    sendMessage: JSON.parse(this.extensaoForm.value.sendMessage)
  }


  this.service.updatter('Agent/update', updateExtenssao).subscribe(
    (res) => {

      // console.log(res);
      //this.GetAllOperadoras(); //Chamar a lista de operadoras
      this.GetAllExtenssoes();
      this.extensaoForm.reset(); //Fazer reset do formulário
      //this.button_Name = 'Salvar';
      this.toastr.success('Extensão actualizada com sucessos', 'Extensão');

      this.spinner.hide();



    }, (error) => {

      this.toastr.error('Ocorreu um erro ao tentar actualizar a extensão', 'Extensão');
      this.spinner.hide();

    });
}


SelectDataForDelete(id: any)
{
    var dataFind = this.extensoes.find(o => o.idAgent === id);
    this.dataForDelete = dataFind;
}


DeleteExtensao()
{


  this.spinner.show();

  var dataFind = this.extensoes.find(o => o.idAgent === this.dataForDelete.idAgent);

  let deleteExtensao = {

    idAgent: dataFind.idAgent,
    extension: dataFind.extension,
    firstName: dataFind.firstName,
    lastName: dataFind.lastName
}

this.service.postter('Agent/delete', deleteExtensao).subscribe(
  (res) => {

    this.GetAllExtenssoes();
    this.toastr.success('Extesão eliminada com sucessos', 'Extesão');
    this.spinner.hide();

  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar a extesão', 'Extesão');
    this.spinner.hide();

  });


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

  this.service.postter('Agent/filter', filtro).subscribe(
    (res) => {

       this.extensoes = res.data;
       this.numberPagination = res.totalPage; //Numero total de paginas
       this.count = res.totalItems;
       this.spinner.hide();

    }, (error) => {

      //console.log(error)
      this.toastr.error('Ocorreu um erro ao tentar mostrar as extensões', 'Extensões');
      this.spinner.hide();

    });


}


}
