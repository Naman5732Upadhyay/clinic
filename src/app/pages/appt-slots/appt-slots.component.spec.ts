import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptSlotsComponent } from './appt-slots.component';

describe('ApptSlotsComponent', () => {
  let component: ApptSlotsComponent;
  let fixture: ComponentFixture<ApptSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApptSlotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApptSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
