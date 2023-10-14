import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingfieldComponent } from './bookingfield.component';

describe('BookingfieldComponent', () => {
  let component: BookingfieldComponent;
  let fixture: ComponentFixture<BookingfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingfieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
