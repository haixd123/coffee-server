import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VietBaiComponent } from './viet-bai.component';

describe('VietBaiComponent', () => {
  let component: VietBaiComponent;
  let fixture: ComponentFixture<VietBaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VietBaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VietBaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
