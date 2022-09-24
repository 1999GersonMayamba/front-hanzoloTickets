import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteracaoListComponent } from './interacao-list.component';

describe('InteracaoListComponent', () => {
  let component: InteracaoListComponent;
  let fixture: ComponentFixture<InteracaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteracaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteracaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
