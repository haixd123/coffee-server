import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCkeditorComponent } from './test-ckeditor.component';

describe('TestCkeditorComponent', () => {
  let component: TestCkeditorComponent;
  let fixture: ComponentFixture<TestCkeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCkeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
