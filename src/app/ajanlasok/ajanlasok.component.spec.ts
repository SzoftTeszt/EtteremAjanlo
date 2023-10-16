import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlasokComponent } from './ajanlasok.component';

describe('AjanlasokComponent', () => {
  let component: AjanlasokComponent;
  let fixture: ComponentFixture<AjanlasokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjanlasokComponent]
    });
    fixture = TestBed.createComponent(AjanlasokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
