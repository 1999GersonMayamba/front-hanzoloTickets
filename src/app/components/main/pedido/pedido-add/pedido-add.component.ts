import { NavbarComponent } from './../../../../Layout/navbar/navbar.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/Services/general-service.service';
import { ReadFile, ReadMode, FilePickerDirective } from "ngx-file-helpers";
import { ToastrService } from 'ngx-toastr';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';

@Component({
  selector: 'app-pedido-add',
  templateUrl: './pedido-add.component.html',
  styleUrls: ['./pedido-add.component.css']
})
export class PedidoAddComponent implements OnInit {

  pedidoForm!: FormGroup;
  TModeloReport!: Array<{idModeloReport: string, descricao: string}>; //Lista de tipos de instituição
  isValidFormSubmitted = false; //Flag de control para validarção do formulário
  IsVisibleReportUniversidadeOne = false; //Flag de control visible/Not visible
  IsVisibleReportUniversidadeTwo = false; //Flag de control visible/Not visible
  SiglaInstituicao!: string;
  NomeInstituicao!: string;
  MsgFile = "Carregar e largar ou selecionar";
  data!: any;
  dados!: any;
  public readMode = ReadMode.dataURL;
  public picked: ReadFile | null = null;

  // @ViewChild("filePicker", { static: false })
  // private filePicker: FilePickerDirective | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private service: GeneralService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.pedidoForm = this._formBuilder.group({
      ModeloImpressao: [['d704d5fe-61ee-4ecd-9c03-7709f6bb1d27'], [Validators.required]],
      Descricao: ['', Validators.required],
      // Ficheiro: ['', Validators.required],
      //CheckPassword: [false] //Variavel para o check da senha
  });

 this.dados = localStorage.getItem(GeneralConstants.UserData.DataUserJson);
  var dado =  JSON.parse(this.dados);
  this.SiglaInstituicao = dado.siglaInstituicao;
  this.NomeInstituicao = dado.nomeInstituicao;

  this.GetAllModeloReport(); //Carregar os tipos de report
  }

  //Carregar a lista de tipos de report
GetAllModeloReport() {

  this.service.getter('ModeloReport').subscribe(
    res => {
      this.TModeloReport  = res.data; //Fazer o set de dados
      this.onSelectedModeloImpressaoMock('d704d5fe-61ee-4ecd-9c03-7709f6bb1d27');
    }
  )
}


//Metodo invocado, quando se carregar um ficheiro
onFilePicked(file: any) {

  if(file.name.includes("xlsx")) //Validar a extensão do ficheiro
  {
    this.picked = file;
    this.MsgFile = file.name;
    console.log(this.picked);
  }
  else
  {
    this.toastr.error('Ficheiro selecionado de formato invalido', 'Ficheiro'); //Mostrar a mensagem quando o tipo de ficheiro selecionado for invalido
    this.MsgFile = "Ficheiro selecionado de formato invalido"
  }

}

onSubmit(){

  this.isValidFormSubmitted = true; //Validar o formulario
  if (!this.pedidoForm.valid) {
      return;
  }

  this.isValidFormSubmitted = false;

  this.data = localStorage.getItem(GeneralConstants.UserData.DataUserJson); //Buscar os dados do local storage
  var dado =  JSON.parse(this.data);


  const base64String = this.picked?.content.replace('data:', '').replace(/^.+,/, ''); // To remove data url part


  console.log(this.pedidoForm.value.ModeloImpressao)

  let pedido = {
    idModeloReport: this.pedidoForm.value.ModeloImpressao,
    idInstituicao: dado.id,
    CardFile:{FileName: this.picked?.name, Base64File: base64String} //this.picked
}

    //Regsitar o pedido
    this.service.postter('Pedido/register', pedido).subscribe(
      (res) => {

         // console.log(res);
          this.toastr.success('O seu pedido foi feito com sucesso', 'Pedido');
          this.ResetFormData(); //Limpar o formulario

      }, (error) => {
        //console.log(error)
        this.toastr.error('Ocorreu um erro ao tentar fazer o seu pedido, tentar mais tarde', 'Pedido');

      }
  );

console.log(pedido);

}

//Método para poder fazer o reset do formulário
ResetFormData(){

  this.pedidoForm.reset(); //Fazer reset do formulario
  this.ngOnInit();
  this.MsgFile = "Carregar e largar ou selecionar";
  this.picked =  null;

}

onSelectedModeloImpressaoChange(data: any)
{

  if(data.target.value == 'd704d5fe-61ee-4ecd-9c03-7709f6bb1d27')
  {
    this.IsVisibleReportUniversidadeOne = true; //Flag de control visible/Not visible
    this.IsVisibleReportUniversidadeTwo = false;
  }else
  {
    this.IsVisibleReportUniversidadeOne = false; //Flag de control visible/Not visible
    this.IsVisibleReportUniversidadeTwo = true;
  }

}

onSelectedModeloImpressaoMock(data: any)
{

  if(data == 'd704d5fe-61ee-4ecd-9c03-7709f6bb1d27')
  {
    this.IsVisibleReportUniversidadeOne = true; //Flag de control visible/Not visible
    this.IsVisibleReportUniversidadeTwo = false;
  }else
  {
    this.IsVisibleReportUniversidadeOne = false; //Flag de control visible/Not visible
    this.IsVisibleReportUniversidadeTwo = true;
  }

}

}
