import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorDetailComponent } from './ckeditor-detail.component';

describe('CkeditorDetailComponent', () => {
  let component: CkeditorDetailComponent;
  let fixture: ComponentFixture<CkeditorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
