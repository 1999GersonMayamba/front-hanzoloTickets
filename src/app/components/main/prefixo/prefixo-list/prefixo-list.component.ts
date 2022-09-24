import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-prefixo-list',
  templateUrl: './prefixo-list.component.html',
  styleUrls: ['./prefixo-list.component.css']
})
export class PrefixoListComponent implements OnInit {


  Prefixos!: Array<any>; //Lista de chamadas
  Operadoras!: Array<any>; //Lista de operadoras
  isValidFormSubmitted!: boolean;
  button_Name!:any;
  dataForUpdate!: any;
  dataForDelete!: any;
  prefixoForm!: FormGroup;

  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {


    this.prefixoForm = this._formBuilder.group(
      {
        operadora: [['12f43bb4-4fde-4391-b802-800547362059'], [Validators.required]],
        prefixo: ['', [Validators.required]]

      });

    this.GetAllPrefixo(); //Trazer a lista de prefixos
    this.GetAllOperadoras(); //Tazer todas a operadoras
  }

  GetAllPrefixo()
  {
    this.service.getter('Prefixo').subscribe(
      (res) => {

         this.Prefixos = res.data;

      }, (error) => {

        this.toastr.error('Ocorreu um erro ao tentar fazer o seu pedido, tentar mais tarde', 'Prexixo');

      });
  }


//Mostrar o modal de termos e condições
showDialog(idModal: any, intecion: any){


  this.prefixoForm.reset(); //Fazer reset do formulario
  this.prefixoForm.controls['operadora'].setValue('12f43bb4-4fde-4391-b802-800547362059');
  //this.prefixoForm.controls['temIva'].setValue(1);

  if(intecion == 'add')
     this.button_Name = "Salvar";
  else
     this.button_Name = 'Actualizar'

}

  GetAllOperadoras()
  {
    this.service.getter('Operadora').subscribe(
      (res) => {

         this.Operadoras = res.data;

      }, (error) => {

       // this.toastr.error('Ocorreu um erro ao tentar fazer o seu pedido, tentar mais tarde', 'Prexixo');
      });
  }


RegistarPrefixo()
{


  //Mostrar o loader na tela
  this.spinner.show();


  this.isValidFormSubmitted = true;
  if (!this.prefixoForm.valid) {
      return;
  }

  this.isValidFormSubmitted = false;


  let addPrefixo = {

    idOperadora: this.prefixoForm.value.operadora,
    descricao: this.prefixoForm.value.prefixo
}



if(this.button_Name === 'Salvar')
{
    this.service.postter('Prefixo/register', addPrefixo).subscribe(
      (res) => {

        this.GetAllPrefixo(); //Chamar a lista de tarifarios
        this.prefixoForm.reset(); //Fazer reset do formulário
        this.toastr.success('Prefixo adicionado com sucessos', 'Prefixo');

        this.spinner.hide();


      }, (error) => {
        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar adicionar o prefixo', 'Prefixo');

        this.spinner.hide();

      });
}else
{
      let updatePrefixo =
      {
        id: this.dataForUpdate.id,
        idOperadora: this.prefixoForm.value.operadora,
        descricao: this.prefixoForm.value.prefixo
      }

      this.service.updatter('Prefixo/update', updatePrefixo).subscribe(
        (res) => {


          this.GetAllPrefixo();
          this.prefixoForm.reset(); //Fazer reset do formulário
          this.button_Name = 'Salvar';
          this.toastr.success('Prefixo actualizada com sucessos', 'Prefixo');

          this.spinner.hide();

        }, (error) => {

          this.toastr.error('Ocorreu um erro ao tentar actualizar o prefixo', 'Prefixo');

          this.spinner.hide();

        });

}


}

UpdatePrefixo(Id: any)
{

  this.button_Name = 'Actualizar';
  var dataFind = this.Prefixos.find(o => o.id === Id);
  this.dataForUpdate = dataFind;
  this.prefixoForm.controls['operadora'].setValue(dataFind.idOperadora);
  this.prefixoForm.controls['prefixo'].setValue(dataFind.descricao);

}


DeletePrefixo()
{


  this.spinner.show();

  var dataFind = this.Prefixos.find(o => o.id === this.dataForDelete.id);

  let deletePrefixo = {

    id: dataFind.id,
    idOperadora: dataFind.idOperadora,
    descricao: dataFind.descricao
}

this.service.postter('Prefixo/delete', deletePrefixo).subscribe(
  (res) => {

    this.GetAllPrefixo();
    this.toastr.success('Prefixo eliminada com sucessos', 'Prefixo');

    this.spinner.hide();

  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar a prefixo', 'Prefixo');

    this.spinner.hide();

  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.Prefixos.find(o => o.id === id);
    this.dataForDelete = dataFind;
}

}
