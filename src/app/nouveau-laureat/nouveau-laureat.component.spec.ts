import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauLaureatComponent } from './nouveau-laureat.component';

describe('NouveauLaureatComponent', () => {
  let component: NouveauLaureatComponent;
  let fixture: ComponentFixture<NouveauLaureatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauLaureatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauLaureatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
