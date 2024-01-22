import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaittingPostComponent } from './waitting-post.component';

describe('WaittingPostComponent', () => {
  let component: WaittingPostComponent;
  let fixture: ComponentFixture<WaittingPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaittingPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaittingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
