import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFicheiroParaImpressaoComponent } from './pedido-ficheiro-para-impressao.component';

describe('PedidoFicheiroParaImpressaoComponent', () => {
  let component: PedidoFicheiroParaImpressaoComponent;
  let fixture: ComponentFixture<PedidoFicheiroParaImpressaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoFicheiroParaImpressaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoFicheiroParaImpressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
