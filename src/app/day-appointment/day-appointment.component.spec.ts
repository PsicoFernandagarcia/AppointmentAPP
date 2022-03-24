import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAppointmentComponent } from './day-appointment.component';

describe('DayAppointmentComponent', () => {
  let component: DayAppointmentComponent;
  let fixture: ComponentFixture<DayAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
