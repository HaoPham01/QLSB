import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballfieldComponent } from './footballfield.component';

describe('FootballfieldComponent', () => {
  let component: FootballfieldComponent;
  let fixture: ComponentFixture<FootballfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballfieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
