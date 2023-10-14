import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnVnPayComponent } from './return-vn-pay.component';

describe('ReturnVnPayComponent', () => {
  let component: ReturnVnPayComponent;
  let fixture: ComponentFixture<ReturnVnPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnVnPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnVnPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
