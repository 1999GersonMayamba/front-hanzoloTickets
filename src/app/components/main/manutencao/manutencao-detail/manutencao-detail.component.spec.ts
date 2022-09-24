import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoDetailComponent } from './manutencao-detail.component';

describe('ManutencaoDetailComponent', () => {
  let component: ManutencaoDetailComponent;
  let fixture: ComponentFixture<ManutencaoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencaoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
