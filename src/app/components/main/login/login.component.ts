import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/Services/general-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth-service.service';
import { Utilizador } from 'src/app/Models/utilizador';
import { ToastrService } from 'ngx-toastr';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  alterarsenhaForm!: FormGroup;
  config: any;
  usuario = new Utilizador();
  isValidFormSubmitted = false;
  isValidFormSubmittedPassword = false;
  modal_t: any;
  StringJsonData!: any;



  constructor(
    private router: Router,
    private auth: AuthService,
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', Validators.required],
      CheckPassword: [true] //Variavel para o check da senha
  });


  this.alterarsenhaForm = this._formBuilder.group({
    novaSenha: ['', [Validators.required]],
    repetirNovaSenha: ['', Validators.required]

  });


  }

  onSubmit(): void {


      //Mostrar o loader na tela
  this.spinner.show();

    this.isValidFormSubmitted = true;
    if (!this.loginForm.valid) {
      this.spinner.hide();
        return;
    }

    this.isValidFormSubmitted = false;
    this.usuario.email = this.loginForm.value.Email
    this.usuario.senha = this.loginForm.value.Password

   // this.usuario.senha = this.loginForm.value.password

    let user = {
        email: this.loginForm.value.Email,
        userName: this.loginForm.value.Email,
        password: this.loginForm.value.Password
       // senha: this.loginForm.value.password,
        // grant_type: 'password'
    }


   // this.showDialog('modal_2')  //Show Loding Page
  //  this._fuseSplashScreenService.show();

    this.auth.postter('Account/authenticate', user).subscribe(
        (res) => {

          if(res.succeeded)
          {

            if(this.usuario.senha == 'Ucall123#') //Se utilizou a senha padrão para podr fazer login, pedir para ele alterar
            {

              this.StringJsonData = JSON.stringify(res.data);
              this.toastr.info('Deve alterar a sua senha, não pode usar a senha padrão', 'Alterar senha');
              this.showDialog('modal_1');  //Mostrar a Modal
              this.spinner.hide();
              return;
            }


            // GeneralConstants.Ispago = res.data.isPago;
            // localStorage.setItem(GeneralConstants.UserData.IsPago, res.data.isPago);
            this.StringJsonData = JSON.stringify(res.data);
            localStorage.setItem(GeneralConstants.UserData.DataUserJson, this.StringJsonData);
            //this.RegisterInLocalStoreDataForUser(res.data); //Registar os dados do user no local storage
            this.spinner.hide();
            this.router.navigate(['/render']);
          }



        }, (error) => {

          this.toastr.error(error.error.Message, 'Entrar');
          this.spinner.hide();
        }
    );

}

RegisterInLocalStoreDataForUser(data: any)
{
  localStorage.setItem(GeneralConstants.UserData.DataUserJson, JSON.stringify(data));
}


//Rejeitar os termos e condições
RejeitarTermosCondicoes()
{
    //Termos e condições rejeitado
    this.closeDialog('modal_1'); //Fechar o Modal
    this.toastr.error('Para avançar na plataforma deve se aceitar os termos e condições', 'Termos e condições');
}

//Aceitar os termos e condições
AlterarSenha()
{

  this.spinner.show();

  this.isValidFormSubmittedPassword = true;

    if (!this.alterarsenhaForm.valid) {

      this.spinner.hide();
        return;
    }


  this.isValidFormSubmittedPassword = false;


  let resetPassword = {

    //email: this.loginForm.value.Email,
    userName: this.loginForm.value.Email,
    password: this.alterarsenhaForm.value.novaSenha,
    confirmPassword: this.alterarsenhaForm.value.repetirNovaSenha,
    token: "string"
}


if(resetPassword.password != resetPassword.confirmPassword)
{
  this.toastr.error('As senhas, não podem ser diferentes', 'Alterar senha');
  this.spinner.hide();
  return;
}

if(resetPassword.password == 'Ucall123#')
{
  this.toastr.error('Não pode usar a senha padrão', 'Alterar senha');
  this.spinner.hide();
  return;
}

console.log(resetPassword)


this.auth.postter('Account/reset-password', resetPassword).subscribe(
    (res) => {

      if(res.succeeded)
      {

        localStorage.setItem(GeneralConstants.UserData.DataUserJson, this.StringJsonData);
        this.closeDialog('modal_1'); //Fechar a modal
        this.router.navigate(['/render']);
        this.spinner.hide();
      }



    }, (error) => {

      this.toastr.error(error.error.Message, 'Altera senha');
      this.spinner.hide();
    }
);


    //Termos e condições rejeitado
    //this.closeDialog('modal_1'); //Fechar o Modal
}


//Mostrar o modal de termos e condições
showDialog(idModal: any){
  this.modal_t  = document.getElementById(idModal)
  this.modal_t.classList.remove('hhidden')
  this.modal_t.classList.add('sshow');
}

//Ocultar o modal de termos & condições
closeDialog(idModal: any) {
  this.modal_t  = document.getElementById(idModal)
  this.modal_t.classList.remove('sshow')
  this.modal_t.classList.add('hhidden');
}


}
