import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenApiComponent } from './calen-api.component';

describe('CalenApiComponent', () => {
  let component: CalenApiComponent;
  let fixture: ComponentFixture<CalenApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
