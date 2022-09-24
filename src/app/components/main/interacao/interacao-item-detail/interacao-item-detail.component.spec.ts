import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteracaoItemDetailComponent } from './interacao-item-detail.component';

describe('InteracaoItemDetailComponent', () => {
  let component: InteracaoItemDetailComponent;
  let fixture: ComponentFixture<InteracaoItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteracaoItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteracaoItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
