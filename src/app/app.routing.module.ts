import { RenderComponent } from './Layout/render/render.component';
import { ForgotpasswordComponent } from './components/main/forgotpassword/forgotpassword.component';
import { NgModule, ModuleWithProviders} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { ResetpasswordComponent } from './components/main/resetpassword/resetpassword.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/main/home/home.component';
import { PedidoListComponent } from './components/main/pedido/pedido-list/pedido-list.component';
import { PedidoItemDetailComponent } from './components/main/pedido/pedido-item-detail/pedido-item-detail.component';
import { InteracaoListComponent } from './components/main/interacao/interacao-list/interacao-list.component';
import { UtilizadorListComponent } from './components/main/utilizador/utilizador-list/utilizador-list.component';
import { TarifarioListComponent } from './components/main/tarifario/tarifario-list/tarifario-list.component';
import { ExtensaoListComponent } from './components/main/extensao/extensao-list/extensao-list.component';
import { PrefixoListComponent } from './components/main/prefixo/prefixo-list/prefixo-list.component';
import { OperadoraListComponent } from './components/main/operadora/operadora-list/operadora-list.component';
import { NumeroIsentoListComponent } from './components/main/numeroinseto/numero-isento-list/numero-isento-list.component';
import { HorariochamadaListComponent } from './components/main/horariochamada/horariochamada-list/horariochamada-list.component';
import { TempomensaggemComponent } from './components/main/tempomensaggem/tempomensaggem.component';
import { ManutencaoListComponent } from './components/main/manutencao/manutencao-list/manutencao-list.component';
import { ManutencaoDetailComponent } from './components/main/manutencao/manutencao-detail/manutencao-detail.component';
// Rotas


const appRoutes: Routes = [
    // { path: 'home', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetpassword', component: ResetpasswordComponent },
    { path: 'resetpassword', component: ResetpasswordComponent },
    { path: 'render', component: RenderComponent,  canActivate: [AuthGuard] },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'pedidosList', component: PedidoListComponent, canActivate: [AuthGuard]},
    { path: 'interacaoList', component: InteracaoListComponent, canActivate: [AuthGuard]},
    { path: 'utilizadorList', component: UtilizadorListComponent, canActivate: [AuthGuard]},
    { path: 'tarifarioList', component: TarifarioListComponent, canActivate: [AuthGuard]},
    { path: 'extensaoList', component: ExtensaoListComponent, canActivate: [AuthGuard]},
    { path: 'prefixoList', component: PrefixoListComponent, canActivate: [AuthGuard]},
    { path: 'operadoraList', component: OperadoraListComponent, canActivate: [AuthGuard]},
    { path: 'pedidosListItem/:IdPedido', component: PedidoItemDetailComponent, canActivate: [AuthGuard]},
    { path: 'numeroIsentoList', component: NumeroIsentoListComponent, canActivate: [AuthGuard]},
    { path: 'horarioChamadaList', component: HorariochamadaListComponent, canActivate: [AuthGuard]},
    { path: 'tempoMensagemList', component: TempomensaggemComponent, canActivate: [AuthGuard]},
    { path: 'manutencaoList', component: ManutencaoListComponent, canActivate: [AuthGuard]},
    { path: 'manutencaoDetail', component: ManutencaoDetailComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/render', pathMatch: 'full' },
    { path: '',  redirectTo: '/render', pathMatch: 'full' }, // catch all route

  ];


  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  // export const routingModule: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
