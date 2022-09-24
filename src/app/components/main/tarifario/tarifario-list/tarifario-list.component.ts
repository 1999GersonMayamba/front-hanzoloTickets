import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/Services/general-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-tarifario-list',
  templateUrl: './tarifario-list.component.html',
  styleUrls: ['./tarifario-list.component.css']
})
export class TarifarioListComponent implements OnInit {


  tarifarios!: Array<any>; //Lista de tarifarios
  operadoras!: Array<any>; //Lista de tarifarios
  isValidFormSubmitted!: boolean;
  tarifarioForm!: FormGroup;
  button_Name: any;
  dataForUpdate!: any;
  dataForDelete!: any;


  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.tarifarioForm = this._formBuilder.group({
      operadora: [['12f43bb4-4fde-4391-b802-800547362059'], [Validators.required]],
      temIva: [[1], [Validators.required]],
      mesmaRede: [[1], [Validators.required]],
      valor: [0.00, [Validators.required]]
  });


    this.GetAllTarifario(); //Get All Tarifario
    this.GetAllOperadoras(); //Trazer todas as operadoras
  }

  GetAllTarifario()
  {
    this.service.getter('TaxaOperadora').subscribe(
      (res) => {

         //console.log(res);
         this.tarifarios = res.data;
        // this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      }, (error) => {
        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      });
  }

  GetAllOperadoras()
  {
    this.service.getter('Operadora').subscribe(
      (res) => {

         //console.log(res);
         this.operadoras = res.data;
        // this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      }, (error) => {
        //console.log(error)
        //this.toastr.error('Ocorreu um erro ao tentar registar o tarifario, tentar mais tarde', 'Tarifario');

      });
  }


//Mostrar o modal de termos e condições
showDialog(idModal: any, intecion: any){


  this.tarifarioForm.reset(); //Fazer reset do formulario
  this.tarifarioForm.controls['operadora'].setValue('12f43bb4-4fde-4391-b802-800547362059');
  this.tarifarioForm.controls['temIva'].setValue(1);
  this.tarifarioForm.controls['mesmaRede'].setValue(1);
  this.tarifarioForm.controls['valor'].setValue(0.00);

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
  if (!this.tarifarioForm.valid) {
      return;
  }

  this.isValidFormSubmitted = false;


  let addtaxaOperadora = {

    idOperadora: this.tarifarioForm.value.operadora,
    temIva: this.tarifarioForm.value.temIva == 1 ? true : false,
    mesmaRede: this.tarifarioForm.value.mesmaRede == 1 ? true : false,
    valor: this.tarifarioForm.value.valor
}


if(this.button_Name === 'Salvar')
{
    this.service.postter('TaxaOperadora/register', addtaxaOperadora).subscribe(
      (res) => {

        // console.log(res);
        //this.GetAllOperadoras(); //Chamar a lista de operadoras
        this.GetAllTarifario(); //Chamar a lista de tarifarios
        this.tarifarioForm.reset(); //Fazer reset do formulário
        this.toastr.success('Tarifário adicionado com sucessos', 'Tarifario');


        this.spinner.hide();

      }, (error) => {


        this.toastr.error('Ocorreu um erro ao tentar adicionar o tarifário', 'Tarifário');
        this.spinner.hide();

      });
}else
{
      let updateOperadora =
      {
        id: this.dataForUpdate.id,
        idOperadora: this.tarifarioForm.value.operadora,
        temIva: this.tarifarioForm.value.temIva == 1 ? true : false,
        mesmaRede: this.tarifarioForm.value.mesmaRede == 1 ? true : false,
        valor: this.tarifarioForm.value.valor
      }

      this.service.updatter('TaxaOperadora/update', updateOperadora).subscribe(
        (res) => {

          // console.log(res);
          //this.GetAllOperadoras(); //Chamar a lista de operadoras
          this.GetAllTarifario();
          this.tarifarioForm.reset(); //Fazer reset do formulário
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
  var dataFind = this.tarifarios.find(o => o.id === Id);
  this.dataForUpdate = dataFind;
  this.tarifarioForm.controls['operadora'].setValue(dataFind.idOperadora);
  this.tarifarioForm.controls['temIva'].setValue(dataFind.temIva == true ? 1 : 0);
  this.tarifarioForm.controls['mesmaRede'].setValue(dataFind.mesmaRede == true ? 1 : 0);
  this.tarifarioForm.controls['valor'].setValue(dataFind.valor);
}

DeleteTarifario()
{

  this.spinner.show();

  var dataFind = this.tarifarios.find(o => o.id === this.dataForDelete.id);

  let deletetaxaOperadora = {

    id: dataFind.id,
    idOperadora: dataFind.idOperadora,
    temIva: dataFind.temIva,
    mesmaRede: dataFind.mesmaRede,
    valor: dataFind.valor
}

this.service.postter('TaxaOperadora/delete', deletetaxaOperadora).subscribe(
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
    var dataFind = this.tarifarios.find(o => o.id === id);
    this.dataForDelete = dataFind;
}

}
