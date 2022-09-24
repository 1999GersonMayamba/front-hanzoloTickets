import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixoListComponent } from './prefixo-list.component';

describe('PrefixoListComponent', () => {
  let component: PrefixoListComponent;
  let fixture: ComponentFixture<PrefixoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
