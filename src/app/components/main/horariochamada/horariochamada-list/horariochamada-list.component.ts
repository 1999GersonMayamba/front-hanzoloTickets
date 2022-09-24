import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/Services/general-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-horariochamada-list',
  templateUrl: './horariochamada-list.component.html',
  styleUrls: ['./horariochamada-list.component.css']
})
export class HorariochamadaListComponent implements OnInit {



  horarios!: Array<any>; //Lista de horarios
  isValidFormSubmitted!: boolean;
  horarioForm!: FormGroup;
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

    this.horarioForm = this._formBuilder.group({
      nome: ['', [Validators.required]],
      horarioInicio: ['', [Validators.required]],
      horarioFim: ['', [Validators.required]]
  });

    this.GetAllhorarios(); //Get all horarios

  }

  GetAllhorarios()
  {
    this.service.getter('HorarioChamada').subscribe(
      (res) => {

         //console.log(res);
         this.horarios = res.data;


      }, (error) => {

        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar mostrar as horarios, tentar mais tarde', 'horarios');

      });
  }

  RegistarOperadora()
  {


  //Mostrar o loader na tela
  this.spinner.show();


    this.isValidFormSubmitted = true;
    if (!this.horarioForm.valid) {
        return;
    }

    this.isValidFormSubmitted = false;

    let addHorario = {

      descricao: this.horarioForm.value.nome,
      horaMin: this.horarioForm.value.horarioInicio + ':00',
      horaMax: this.horarioForm.value.horarioFim + ':00'
  }


  if(this.button_Name === 'Salvar')
  {
    var dataFind = this.horarios.find(o => o.descricao.toLowerCase() === addHorario.descricao.toLowerCase());
    if(dataFind != null) //Se a Operadora já exsitir
    {
      this.toastr.error('O horário que está a tentar registar já existe', 'Horário');
      this.spinner.hide();
      return ;
    }


      this.service.postter('HorarioChamada/register', addHorario).subscribe(
        (res) => {

          // console.log(res);
          this.GetAllhorarios(); //Chamar a lista de horarios
          this.horarioForm.reset(); //Fazer reset do formulário
          this.closeDialog('modal_1'); //Fechar a modal
          this.toastr.success('Horário adicionado com sucessos', 'Horário');
          this.spinner.hide();

        }, (error) => {

          this.toastr.error('Ocorreu um erro ao tentar adicionar a horário', 'Horário');
          this.spinner.hide();

        });
  }else
  {
        let updateOperadora =
        {
          idHorarioChamada: this.dataForUpdate.idHorarioChamada,
          descricao: this.horarioForm.value.nome,
          horaMin: this.horarioForm.value.horarioInicio,  //+ ':00',
          horaMax: this.horarioForm.value.horarioFim //+ ':00'
        }

        console.log(updateOperadora)

        this.service.updatter('HorarioChamada/update', updateOperadora).subscribe(
          (res) => {

            // console.log(res);
            this.GetAllhorarios(); //Chamar a lista de horarios
            this.horarioForm.reset(); //Fazer reset do formulário
            this.button_Name = 'Salvar';
            this.toastr.success('Horário actualizada com sucessos', 'Horário');
            this.spinner.hide();


          }, (error) => {

            this.toastr.error('Ocorreu um erro ao tentar actualizar a horário', 'Horário');
            this.spinner.hide();

          });

  }


  }


  UpdateOperadora(Id: any)
  {

    this.button_Name = 'Actualizar';
    var dataFind = this.horarios.find(o => o.idHorarioChamada === Id);
    this.dataForUpdate = dataFind;
    this.horarioForm.controls['nome'].setValue(dataFind.descricao); //Fazer set da operadora que foi selecionada
    this.horarioForm.controls['horarioInicio'].setValue(dataFind.horaMin); //Fazer set da operadora que foi selecionada
    this.horarioForm.controls['horarioFim'].setValue(dataFind.horaMax); //Fazer set da operadora que foi selecionada

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

  //var dataFind = this.horarios.find(o => o.idHorarioChamada === this.dataForDelete.idHorarioChamada);

  let deleteOperadora = {

    idHorarioChamada: this.dataForDelete.idHorarioChamada,
    descricao: this.dataForDelete.descricao,
    horaMin: this.dataForDelete.horaMin, //+ ':00',
    horaMax: this.dataForDelete.horaMax //+ ':00'
}



this.service.postter('HorarioChamada/delete', deleteOperadora).subscribe(
  (res) => {

    this.GetAllhorarios();
    this.toastr.success('Operadora eliminada com sucessos', 'Operadora');

    this.spinner.hide();


  }, (error) => {

    this.toastr.error('Ocorreu um erro ao tentar eliminar a operadora', 'Operadora');

    this.spinner.hide();


  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.horarios.find(o => o.idHorarioChamada === id);
    this.dataForDelete = dataFind;
}


}
