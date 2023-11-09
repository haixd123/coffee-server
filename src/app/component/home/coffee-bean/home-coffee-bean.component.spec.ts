import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoffeeBeanComponent } from './home-coffee-bean.component';

describe('HomeCoffeeBeanComponent', () => {
  let component: HomeCoffeeBeanComponent;
  let fixture: ComponentFixture<HomeCoffeeBeanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCoffeeBeanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCoffeeBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
