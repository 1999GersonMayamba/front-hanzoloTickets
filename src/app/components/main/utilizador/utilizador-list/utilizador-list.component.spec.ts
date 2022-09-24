import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizadorListComponent } from './utilizador-list.component';

describe('UtilizadorListComponent', () => {
  let component: UtilizadorListComponent;
  let fixture: ComponentFixture<UtilizadorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizadorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
