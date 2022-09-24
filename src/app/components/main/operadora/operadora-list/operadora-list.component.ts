import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-operadora-list',
  templateUrl: './operadora-list.component.html',
  styleUrls: ['./operadora-list.component.css']
})
export class OperadoraListComponent implements OnInit {


  operadoras!: Array<any>; //Lista de operadoras
  isValidFormSubmitted!: boolean;
  operadoraForm!: FormGroup;
  modal_t: any;
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

    this.operadoraForm = this._formBuilder.group({
      nome: ['', [Validators.required]]
  });

    this.GetAllOperadoras(); //Get all operadoras
  }

  GetAllOperadoras()
  {
    this.service.getter('Operadora').subscribe(
      (res) => {

         //console.log(res);
         this.operadoras = res.data;


      }, (error) => {

        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar mostrar as operadoras, tentar mais tarde', 'Operadoras');

      });
  }

  RegistarOperadora()
  {


    this.spinner.show();

    this.isValidFormSubmitted = true;
    if (!this.operadoraForm.valid) {
        return;
    }

    this.isValidFormSubmitted = false;

    let addOperadora = {
      descricao: this.operadoraForm.value.nome
  }


  if(this.button_Name === 'Salvar')
  {
    var dataFind = this.operadoras.find(o => o.descricao.toLowerCase() === addOperadora.descricao.toLowerCase());
    if(dataFind != null) //Se a Operadora já exsitir
    {
      this.toastr.error('A operadora que está a tentar registar já existe', 'Operadora');
      this.spinner.hide();
      return ;
    }

      this.service.postter('Operadora/register', addOperadora).subscribe(
        (res) => {

          // console.log(res);
          this.GetAllOperadoras(); //Chamar a lista de operadoras
          this.operadoraForm.reset(); //Fazer reset do formulário
          this.closeDialog('modal_1'); //Fechar a modal
          this.toastr.success('Operadora adicionado com sucessos', 'Operadora');

          this.spinner.hide();

        }, (error) => {

          this.toastr.error('Ocorreu um erro ao tentar adicionar a operadora', 'Operadora');

          this.spinner.hide();

        });
  }else
  {
        let updateOperadora =
        {
          id: this.dataForUpdate.id,
          descricao: this.operadoraForm.value.nome
        }

        this.service.updatter('Operadora/update', updateOperadora).subscribe(
          (res) => {

            // console.log(res);
            this.GetAllOperadoras(); //Chamar a lista de operadoras
            this.operadoraForm.reset(); //Fazer reset do formulário
            this.button_Name = 'Salvar';
            this.toastr.success('Operadora actualizada com sucessos', 'Operadora');

            this.spinner.hide();


          }, (error) => {

            this.toastr.error('Ocorreu um erro ao tentar actualizar a operadora', 'Operadora');

            this.spinner.hide();

          });

  }


  }


  UpdateOperadora(Id: any)
  {

    this.button_Name = 'Actualizar';
    var dataFind = this.operadoras.find(o => o.id === Id);
    this.dataForUpdate = dataFind;
    this.operadoraForm.controls['nome'].setValue(dataFind.descricao); //Fazer set da operadora que foi selecionada
    //this.showDialog('modal_1','update'); //Mostar a modal
  }

//Mostrar o modal de termos e condições
showDialog(idModal: any, intecion: any){

  if(intecion == 'add')
     this.button_Name = "Salvar";
  else
     this.button_Name = 'Actualizar'

}

//Ocultar o modal de termos & condições
closeDialog(idModal: any) {
  // this.modal_t  = document.getElementById(idModal)
  // this.modal_t.classList.remove('sshow')
  // this.modal_t.classList.add('hhidden');
}

isEmpty(str: any) {
  return (!str || str.length === 0 );
}

DeleteOperadora()
{

  this.spinner.show();

  var dataFind = this.operadoras.find(o => o.id === this.dataForDelete.id);

  let deleteOperadora = {

    id: dataFind.id,
    descricao: dataFind.descricao
}

this.service.postter('Operadora/delete', deleteOperadora).subscribe(
  (res) => {

    this.GetAllOperadoras();
    this.toastr.success('Operadora eliminada com sucessos', 'Operadora');

    this.spinner.hide();


  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar a operadora', 'Operadora');

    this.spinner.hide();

  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.operadoras.find(o => o.id === id);
    this.dataForDelete = dataFind;
}



}
