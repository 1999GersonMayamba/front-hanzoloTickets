import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifarioListInternacionalComponent } from './tarifario-list-internacional.component';

describe('TarifarioListInternacionalComponent', () => {
  let component: TarifarioListInternacionalComponent;
  let fixture: ComponentFixture<TarifarioListInternacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifarioListInternacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifarioListInternacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
