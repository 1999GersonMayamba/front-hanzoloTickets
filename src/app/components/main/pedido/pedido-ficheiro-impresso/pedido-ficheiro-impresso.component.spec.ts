import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFicheiroImpressoComponent } from './pedido-ficheiro-impresso.component';

describe('PedidoFicheiroImpressoComponent', () => {
  let component: PedidoFicheiroImpressoComponent;
  let fixture: ComponentFixture<PedidoFicheiroImpressoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoFicheiroImpressoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoFicheiroImpressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
