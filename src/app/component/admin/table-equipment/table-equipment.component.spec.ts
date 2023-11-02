import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEquipmentComponent } from './table-equipment.component';

describe('TableEquipmentComponent', () => {
  let component: TableEquipmentComponent;
  let fixture: ComponentFixture<TableEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
