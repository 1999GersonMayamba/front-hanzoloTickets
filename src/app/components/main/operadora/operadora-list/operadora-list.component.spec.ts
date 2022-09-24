import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadoraListComponent } from './operadora-list.component';

describe('OperadoraListComponent', () => {
  let component: OperadoraListComponent;
  let fixture: ComponentFixture<OperadoraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperadoraListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadoraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
