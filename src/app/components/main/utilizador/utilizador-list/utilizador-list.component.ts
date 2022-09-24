import { Component, OnInit } from '@angular/core';
import { Utilizador } from 'src/app/Models/utilizador';
import { AuthService } from 'src/app/Services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/Models/role';
import { ToastrService } from 'ngx-toastr';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-utilizador-list',
  templateUrl: './utilizador-list.component.html',
  styleUrls: ['./utilizador-list.component.css']
})
export class UtilizadorListComponent implements OnInit {


  Users!: Array<Utilizador>; //Lista de tipos de instituição
  Roles!: Array<Roles>; //Lista de roles do utilizador
  utilizadorForm!: FormGroup;
  isValidFormSubmitted = false; //Flag de control para validarção do formulário
  SeeConfigMenu!: boolean;
  button_Name!:any;
  dataFind!: any;
  dataForDelete!: any;


  constructor(
    private service: AuthService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.button_Name = 'Salvar'
    this.utilizadorForm = this._formBuilder.group({

      nomeCompleto: ['', Validators.required],
      email: ['', Validators.required],
      checkRole: [[''], Validators.required]

  });

    this.GetAllUsersAndRoles(); // Get All Users And Roles
    this.GetAllRoles();
    this.SeeMenusForRoles();
  }


//Carregar a lista de tipos de report
GetAllUsersAndRoles() {


  this.service.getter('Account/usersAndRoles').subscribe(
    res => {
      this.Users  = res.data; //Fazer o set de dados
    }
  )
}


//Carregar a lista de roles da plataforma
GetAllRoles()
{
  this.service.getter('Account/roles').subscribe(
    res => {
      this.Roles  = res; //Fazer o set de dados
    }
  )
}

onSubmit(){


      //Mostrar o loader na tela
      this.spinner.show();

  this.isValidFormSubmitted = true; //Validar o formulario
  if (!this.utilizadorForm.valid) {
      return;
  }

  this.isValidFormSubmitted = false;

  //this.utilizadorForm.value.checkRole
  var role = this.Roles.find(x => x.id == this.utilizadorForm.value.checkRole);

  let user = {

    firstName: this.utilizadorForm.value.nomeCompleto,
    lastName: this.utilizadorForm.value.nomeCompleto,
    email: this.utilizadorForm.value.email,
    userName: this.utilizadorForm.value.email,
    password: 'Ucall123#',
    confirmPassword: 'Ucall123#',
    idTipoUtilizador: 0,
    roles: [role?.name]
  }



  if(this.button_Name == 'Actualizar')
  {


    let userr = {

      userId: this.dataFind.id,
      firstName: this.utilizadorForm.value.nomeCompleto,
      lastName: this.utilizadorForm.value.nomeCompleto,
      email: this.utilizadorForm.value.email,
      userName: this.utilizadorForm.value.nomeCompleto,
      password: 'Ucall123#',
      confirmPassword: 'Ucall123#',
      idTipoUtilizador: 0,
      roles: [role?.name]
    }


    this.service.updatter('Account/register', userr).subscribe(
      (res) => {


    //Mostrar o loader na tela
    this.spinner.hide();

         //console.log(res);
         this.toastr.success('A conta de utilizador foi actualizada com sucesso', 'Utilizador');
         this.ngOnInit(); //Recarregar os dados

      }, (error) => {

        //Mostrar o loader na tela
         this.spinner.hide();
        this.toastr.error('Ocorreu um erro ao tentar actualizada a conta de utilizador', 'Utilizador');

      });

  }else
  {
    this.service.postter('Account/register', user).subscribe(
      (res) => {



        this.spinner.hide();

         //console.log(res);
         this.toastr.success('A conta de utilizador foi criado com sucesso', 'Utilizador');
         this.ngOnInit(); //Recarregar os dados

      }, (error) => {


        this.spinner.hide();
        this.toastr.error('Ocorreu um erro ao tentar criar a conta de utilizador', 'Utilizador');

      });
  }


//console.log(user);

}

SeeMenusForRoles()
{
     var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson) as string;
     var dataJson = JSON.parse(data) as Utilizador;
     var dataFind = dataJson.roles.find(o => o === 'Admin' || o === 'SuperAdmin');

     if(dataFind != null)
          this.SeeConfigMenu =  true;
      else
          this.SeeConfigMenu =  false;


}

UpdatePrefixo(Id: any)
{

  this.button_Name = 'Actualizar';
  this.dataFind = this.Users.find(o => o.id === Id);


  this.utilizadorForm.controls['nomeCompleto'].setValue(this.dataFind?.userName);
  this.utilizadorForm.controls['email'].setValue(this.dataFind?.email);
  this.utilizadorForm.controls['checkRole'].setValue(this.dataFind?.roles[0].id);


}

DeleteTarifario()
{


      //Mostrar o loader na tela
      this.spinner.show();


  //var dataFind = this.Users.find(o => o.id === this.dataForDelete.id);

  let deletetaxaOperadora = {

    IdUser: this.dataForDelete.id
}

this.service.postter('Account/userDelete/' + this.dataForDelete.id, deletetaxaOperadora).subscribe(
  (res) => {


    this.spinner.hide();

    //this.GetAllTarifario();
    this.toastr.success('Utilizador eliminada com sucesso', 'Utilizador');
   this.ngOnInit(); //Carregar a opagina

  }, (error) => {

    this.spinner.hide();
    this.toastr.error('Ocorreu um erro ao tentar eliminar o utilizador', 'Utilizador');

  });


}

SelectDataForDelete(id: any)
{
    var dataFind = this.Users.find(o => o.id === id);
    this.dataForDelete = dataFind;
}

}
