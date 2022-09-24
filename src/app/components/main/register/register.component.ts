import { Component, OnInit, ViewEncapsulation, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { GeneralService } from 'src/app/Services/general-service.service';
import { Router } from '@angular/router';
import { Instituicao }  from 'src/app/Models/instituicao';
import {ModalserviceService}  from 'src/app/Services/modalservice.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  config: any;
  instituicao = new Instituicao();
  isValidFormSubmitted = false;
  TInstituicao!: Array<{idTipoInstituicao: string, descricao: string}>; //Lista de tipos de instituição
  TSubTipoInstituicao!: Array<{idTipoInstituicao: string, descricao: string, idSubTipoInstituicao: String}>;
  modal_t: any;

  // = new FormControl();

  constructor(
    private router: Router,
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private modalService: ModalserviceService,
    private el: ElementRef,
    private toastr: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    this.registerForm = this._formBuilder.group({
      NomeInstituicao: ['', [Validators.required]],
      TipoInstituicao: [['6496e2cc-c695-482b-88f3-b2f073f688e5'], Validators.required],
      SubTipoInstituicao: [[], Validators.required],
      Email: ['', Validators.required],
     // Password: ['', Validators.required],
      Nif: ['', Validators.required],
      Endereco: ['', Validators.required],
      AceptTermsOfCondictions: [false] //Variavel para o check da senha
  });


  this.GetAllTipoInstituicao(); //Carregar a lista de TipoDeInstituição

  }

  onSubmit(): void {


    this.showDialog(); //Mostrar o dialog de termos e condições
}


onSelectedTipoInstituicaoChange(data: any) {

// console.log(data.target.value);
// console.log('Evento invocado');
this.GetAllSubTipoInstituicaoByIdTipo(data.target.value); //Trazer os subtipos de instituição
}


//Carregar a lista de tipos de instituição
GetAllTipoInstituicao() {
  this.service.getter('TipoInstituicao').subscribe(
    res => {
      this.TInstituicao  = res.data;
      if(this.TInstituicao.length > 0)
      this.GetAllSubTipoInstituicaoByIdTipo(this.TInstituicao[0].idTipoInstituicao); //Trazer as sub instituição da primeira instituição da lista
    }
  )
}


//Carregar a lista de subtipos de instituição pelos Id do tipo de instituição
GetAllSubTipoInstituicaoByIdTipo(IdTipo: string) {
  this.service.getter('SubTipoInstituicao/ByTipoInstiruicao/' + IdTipo).subscribe(
    res => {
      this.TSubTipoInstituicao  = res.data;

      if(this.TSubTipoInstituicao.length > 0)
      this.registerForm.patchValue({SubTipoInstituicao: this.TSubTipoInstituicao[0].idSubTipoInstituicao});

    }
  )
}

//Mostrar o modal de termos e condições
showDialog(){
  this.modal_t  = document.getElementById('modal_1')
  this.modal_t.classList.remove('hhidden')
  this.modal_t.classList.add('sshow');
}

//Rejeitar os termos e condições
RejeitarTermosCondicoes()
{
    //Termos e condições rejeitado
    this.closeDialog(); //Fechar o Modal
    this.toastr.error('Para avançar na plataforma deve se aceitar os termos e condições', 'Termos e condições');
}

//Aceitar os termos e condições
AceitarTermosCondicoes()
{
    //Termos e condições rejeitado
    this.closeDialog(); //Fechar o Modal
    this.registerForm.patchValue({AceptTermsOfCondictions: true}); //Habilitar true termos e condições

    //Registar o cliente na plataforma
    //Formar o ojecto para poder registar a instiuição
    let user = {
        email: this.registerForm.value.Email,
        userName: this.registerForm.value.Email,
        firstName: this.registerForm.value.NomeInstituicao,
        lastName: this.registerForm.value.NomeInstituicao,
        password: 'Ucall123#', //this.registerForm.value.Password,
        confirmPassword: 'Ucall123#', //this.registerForm.value.Password,
        endereco: this.registerForm.value.Endereco,
        nif: this.registerForm.value.Nif,
        idSubTipoInstituicao:this.registerForm.value.SubTipoInstituicao,
        NomeInstituicao:this.registerForm.value.NomeInstituicao
       // senha: this.loginForm.value.password,
        // grant_type: 'password'
    }

    //Regsitar o  user
        this.auth.postter('Account/register', user).subscribe(
        (res) => {

            console.log(res);
            console.log(res.message);
            this.toastr.success('A sua conta de utilizaodr foi criado com sucesso pode aceder a sua conta de email para poder obter a senha e fazar o login na plataforma', 'Utilizador')
            this.router.navigate(['/login']); //Navegar para login para o user poder fazer login na plataforma
        }, (error) => {
          console.log(error)
        }
    );

}

//Ocultar o modal de termos & condições
closeDialog() {
  this.modal_t  = document.getElementById('modal_1')
  this.modal_t.classList.remove('sshow')
  this.modal_t.classList.add('hhidden');
}



}








