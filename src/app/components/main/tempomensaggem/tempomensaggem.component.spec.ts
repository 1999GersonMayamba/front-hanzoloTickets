import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempomensaggemComponent } from './tempomensaggem.component';

describe('TempomensaggemComponent', () => {
  let component: TempomensaggemComponent;
  let fixture: ComponentFixture<TempomensaggemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempomensaggemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempomensaggemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
