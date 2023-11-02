import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCoffeeBeanComponent } from './table-coffee-bean.component';

describe('TableCoffeeBeanComponent', () => {
  let component: TableCoffeeBeanComponent;
  let fixture: ComponentFixture<TableCoffeeBeanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCoffeeBeanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCoffeeBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
