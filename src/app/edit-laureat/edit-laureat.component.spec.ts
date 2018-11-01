import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaureatComponent } from './edit-laureat.component';

describe('EditLaureatComponent', () => {
  let component: EditLaureatComponent;
  let fixture: ComponentFixture<EditLaureatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLaureatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLaureatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
