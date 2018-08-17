import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenAuxComponent } from './calen-aux.component';

describe('CalenAuxComponent', () => {
  let component: CalenAuxComponent;
  let fixture: ComponentFixture<CalenAuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenAuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
