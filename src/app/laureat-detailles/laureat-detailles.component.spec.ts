import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureatDetaillesComponent } from './laureat-detailles.component';

describe('LaureatDetaillesComponent', () => {
  let component: LaureatDetaillesComponent;
  let fixture: ComponentFixture<LaureatDetaillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaureatDetaillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaureatDetaillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
