import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboudComponent } from './aboud.component';

describe('AboudComponent', () => {
  let component: AboudComponent;
  let fixture: ComponentFixture<AboudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
