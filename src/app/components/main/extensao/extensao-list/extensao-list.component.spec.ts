import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensaoListComponent } from './extensao-list.component';

describe('ExtensaoListComponent', () => {
  let component: ExtensaoListComponent;
  let fixture: ComponentFixture<ExtensaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
