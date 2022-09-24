import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroIsentoListComponent } from './numero-isento-list.component';

describe('NumeroIsentoListComponent', () => {
  let component: NumeroIsentoListComponent;
  let fixture: ComponentFixture<NumeroIsentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeroIsentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroIsentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
