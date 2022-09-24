import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { PedidosImpressao } from 'src/app/Models/pedidoImpressao';
import { GeneralService } from 'src/app/Services/general-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {


  PedidosImpressao!: Array<PedidosImpressao>; //Lista de tipos de instituição

  constructor(
    private service: GeneralService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.GetAllPedidosImpressoes(); //Trazer todos os pedidos do cliente
  }


  GetAllPedidosImpressoes()
  {
    //Regsitar o pedido
    var data = localStorage.getItem(GeneralConstants.UserData.DataUserJson); //Buscar os dados do local storage
    var dado = JSON.parse(data as string);
    this.service.getter('Pedido/ByInstituicao/' + dado.id).subscribe(
      (res) => {
        console.log(res);
        this.PedidosImpressao  = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  GoToPedidoDetalhe(pedido: PedidosImpressao)
  {
    this.router.navigate(['/pedidosListItem', pedido.idPedido]);
  }

}
