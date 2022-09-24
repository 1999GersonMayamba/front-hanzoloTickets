import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifarioListComponent } from './tarifario-list.component';

describe('TarifarioListComponent', () => {
  let component: TarifarioListComponent;
  let fixture: ComponentFixture<TarifarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifarioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
