import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadorItemDetailComponent } from './utilizador-item-detail.component';

describe('UtilizadorItemDetailComponent', () => {
  let component: UtilizadorItemDetailComponent;
  let fixture: ComponentFixture<UtilizadorItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizadorItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizadorItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
