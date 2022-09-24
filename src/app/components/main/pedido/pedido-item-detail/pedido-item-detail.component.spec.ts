import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItemDetailComponent } from './pedido-item-detail.component';

describe('PedidoItemDetailComponent', () => {
  let component: PedidoItemDetailComponent;
  let fixture: ComponentFixture<PedidoItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
