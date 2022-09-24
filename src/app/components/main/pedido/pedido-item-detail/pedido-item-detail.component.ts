import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { PedidosImpressao } from 'src/app/Models/pedidoImpressao';
import { GeneralService } from 'src/app/Services/general-service.service';

@Component({
  selector: 'app-pedido-item-detail',
  templateUrl: './pedido-item-detail.component.html',
  styleUrls: ['./pedido-item-detail.component.css']
})
export class PedidoItemDetailComponent implements OnInit {


  @Input()
  PedidosImpressao!: PedidosImpressao;
  id!: string | null;

  constructor(
    private _Activatedroute:ActivatedRoute,
    private service: GeneralService
  ) { }

  ngOnInit(): void {

    this.GetPedidoById();
  }

  GetPedidoById()
  {
    //Regsitar o pedido
    this.id =this._Activatedroute.snapshot.paramMap.get("IdPedido"); //Buscar os dados do local storage
    this.service.getter('Pedido/' + this.id).subscribe(
      (res) => {

        this.PedidosImpressao = res.data;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
