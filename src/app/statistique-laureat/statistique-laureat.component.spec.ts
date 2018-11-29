import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueLaureatComponent } from './statistique-laureat.component';

describe('StatistiqueLaureatComponent', () => {
  let component: StatistiqueLaureatComponent;
  let fixture: ComponentFixture<StatistiqueLaureatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiqueLaureatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueLaureatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
