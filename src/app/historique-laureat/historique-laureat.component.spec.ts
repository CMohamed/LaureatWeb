import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueLaureatComponent } from './historique-laureat.component';

describe('HistoriqueLaureatComponent', () => {
  let component: HistoriqueLaureatComponent;
  let fixture: ComponentFixture<HistoriqueLaureatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueLaureatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueLaureatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
