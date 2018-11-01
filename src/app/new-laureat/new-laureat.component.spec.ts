import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLaureatComponent } from './new-laureat.component';

describe('NewLaureatComponent', () => {
  let component: NewLaureatComponent;
  let fixture: ComponentFixture<NewLaureatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLaureatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLaureatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
