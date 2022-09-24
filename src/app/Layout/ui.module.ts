import { PedidoItemDetailComponent } from './../components/main/pedido/pedido-item-detail/pedido-item-detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RenderComponent } from './render/render.component';
import { HomeComponent } from '../components/main/home/home.component';
import { PedidoAddComponent } from '../components/main/pedido/pedido-add/pedido-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFileHelpersModule } from 'ngx-file-helpers';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { PedidoListComponent } from '../components/main/pedido/pedido-list/pedido-list.component';
import { InteracaoListComponent } from '../components/main/interacao/interacao-list/interacao-list.component';
import { UtilizadorListComponent } from '../components/main/utilizador/utilizador-list/utilizador-list.component';
import { PrefixoListComponent } from '../components/main/prefixo/prefixo-list/prefixo-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PrefixoInternacionalListComponent } from '../components/main/prefixo/prefixo-internacional-list/prefixo-internacional-list.component';
import { ManutencaoListComponent } from '../components/main/manutencao/manutencao-list/manutencao-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ManutencaoDetailComponent } from '../components/main/manutencao/manutencao-detail/manutencao-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxFileHelpersModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    RenderComponent,
    HomeComponent,
    PedidoAddComponent,
    PedidoListComponent,
    PedidoItemDetailComponent,
    InteracaoListComponent,
    UtilizadorListComponent,
    PrefixoListComponent,
    PrefixoInternacionalListComponent,
    ManutencaoListComponent,
    ManutencaoDetailComponent
  ],
  exports: [
    RenderComponent,
  ]
})
export class UiModule { }
