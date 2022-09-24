import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tempomensaggem',
  templateUrl: './tempomensaggem.component.html',
  styleUrls: ['./tempomensaggem.component.css']
})
export class TempomensaggemComponent implements OnInit {

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.prefixoForm = this._formBuilder.group(
      {
        unidade: [['062c9b4b-2673-4535-9a1e-5e5c7958aee4'], [Validators.required]],
        itempo: ['', [Validators.required]]

      });

    this.GetAllPrefixo(); //Trazer a lista de prefixos
    this.GetAllOperadoras(); //Tazer todas a operadoras
  }

  GetAllPrefixo()
  {
    this.service.getter('Tempo').subscribe(
      (res) => {

         this.Prefixos = res.data;

      }, (error) => {

        this.toastr.error('Ocorreu um erro ao tentar fazer o seu pedido, tentar mais tarde', 'Mensagem');

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
    this.service.getter('Unidade').subscribe(
      (res) => {

         this.Operadoras = res.data;

      }, (error) => {

       // this.toastr.error('Ocorreu um erro ao tentar fazer o seu pedido, tentar mais tarde', 'Prexixo');
      });
  }


RegistarPrefixo()
{


  this.isValidFormSubmitted = true;
  if (!this.prefixoForm.valid) {
      return;
  }

  this.isValidFormSubmitted = false;


  let addPrefixo = {

    idUnidade: this.prefixoForm.value.unidade,
    intervalo: this.prefixoForm.value.itempo
}



if(this.button_Name === 'Salvar')
{
    this.service.postter('Prefixo/register', addPrefixo).subscribe(
      (res) => {

        this.GetAllPrefixo(); //Chamar a lista de tarifarios
        this.prefixoForm.reset(); //Fazer reset do formulário
        this.toastr.success('Prefixo adicionado com sucessos', 'Prefixo');


      }, (error) => {
        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar adicionar o prefixo', 'Prefixo');

      });
}else
{
      let updatePrefixo =
      {
        idTempo: this.dataForUpdate.idTempo,
        idUnidade: this.prefixoForm.value.unidade,
        intervalo: this.prefixoForm.value.itempo
      }


      this.service.updatter('Tempo/update', updatePrefixo).subscribe(
        (res) => {


          this.GetAllPrefixo();
          this.prefixoForm.reset(); //Fazer reset do formulário
         //this.button_Name = 'Salvar';
          this.toastr.success('Tempo de mensagem actualizada com sucessos', 'Mensagem');


        }, (error) => {

          this.toastr.error('Ocorreu um erro ao tentar actualizar o Tempo de mensagem', 'Mensagem');

        });

}


}

UpdatePrefixo(Id: any)
{

  this.button_Name = 'Actualizar';
  var dataFind = this.Prefixos.find(o => o.idTempo === Id);
  this.dataForUpdate = dataFind;


 // console.log(dataFind.idUnidade)
  this.prefixoForm.controls['unidade'].setValue(dataFind.idUnidade);
  this.prefixoForm.controls['itempo'].setValue(dataFind.intervalo);


}


DeletePrefixo()
{

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

  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar a prefixo', 'Prefixo');

  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.Prefixos.find(o => o.id === id);
    this.dataForDelete = dataFind;
}

}
