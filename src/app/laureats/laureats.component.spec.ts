import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatsComponent } from './laureats.component';

describe('LaureatsComponent', () => {
  let component: LaureatsComponent;
  let fixture: ComponentFixture<LaureatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaureatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaureatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
