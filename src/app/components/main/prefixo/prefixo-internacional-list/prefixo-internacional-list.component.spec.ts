import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixoInternacionalListComponent } from './prefixo-internacional-list.component';

describe('PrefixoInternacionalListComponent', () => {
  let component: PrefixoInternacionalListComponent;
  let fixture: ComponentFixture<PrefixoInternacionalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefixoInternacionalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefixoInternacionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
