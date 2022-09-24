import { ModuleWithComponentFactories, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { NgxFileHelpersModule } from 'ngx-file-helpers'; //Para se acrder os ficheiros na plataforma


//IMPORT ADICIONADO *POR MIN
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlankComponent } from './components/main/blank/blank.component';
import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { ResetpasswordComponent } from './components/main/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/main/forgotpassword/forgotpassword.component';
import { AuthService } from './Services/auth-service.service';
import { GeneralService } from './Services/general-service.service';
import { ToastrModule } from 'ngx-toastr';
import { ModaldialogComponent } from './components/main/modaldialog/modaldialog.component';
import { UiModule } from './Layout/ui.module';
import { AuthGuard } from './guards/auth.guard';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { PedidoFicheiroParaImpressaoComponent } from './components/main/pedido/pedido-ficheiro-para-impressao/pedido-ficheiro-para-impressao.component';
import { PedidoFicheiroImpressoComponent } from './components/main/pedido/pedido-ficheiro-impresso/pedido-ficheiro-impresso.component';
import { ExcelServiceService } from './Services/excel-service.service';
import { OperadoraListComponent } from './components/main/operadora/operadora-list/operadora-list.component';
import { ExtensaoListComponent } from './components/main/extensao/extensao-list/extensao-list.component';
import { TarifarioListComponent } from './components/main/tarifario/tarifario-list/tarifario-list.component';
import { NumeroIsentoListComponent } from './components/main/numeroinseto/numero-isento-list/numero-isento-list.component';
import { HorariochamadaListComponent } from './components/main/horariochamada/horariochamada-list/horariochamada-list.component';
import { TempomensaggemComponent } from './components/main/tempomensaggem/tempomensaggem.component';
import { TarifarioListInternacionalComponent } from './components/main/tarifario/tarifario-list-internacional/tarifario-list-internacional.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// NO MODULO DEVE TER A DECLARAÇÃO DE: *Componentes, exportação de biblotecas de tudo quando vai se
// precisar dentro no mesmo modulo



@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    ModaldialogComponent,
    PedidoFicheiroParaImpressaoComponent,
    PedidoFicheiroImpressoComponent,
    OperadoraListComponent,
    ExtensaoListComponent,
    TarifarioListComponent,
    NumeroIsentoListComponent,
    HorariochamadaListComponent,
    TempomensaggemComponent,
    TarifarioListInternacionalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UiModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    NgxFileHelpersModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [AuthService, AuthService, GeneralService, AuthGuard, ExcelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
