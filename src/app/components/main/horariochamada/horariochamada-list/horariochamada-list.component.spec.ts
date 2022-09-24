import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariochamadaListComponent } from './horariochamada-list.component';

describe('HorariochamadaListComponent', () => {
  let component: HorariochamadaListComponent;
  let fixture: ComponentFixture<HorariochamadaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorariochamadaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariochamadaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
