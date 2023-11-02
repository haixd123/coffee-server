import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table-equipment',
  templateUrl: './table-equipment.component.html',
  styleUrls: ['./table-equipment.component.scss']
})

export class TableEquipmentComponent implements OnInit {
  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  handleAdd() {
    this.isAdd = true;
  }

  handleEdit(data: any) {
    this.isEdit = true;
    console.log('item: ', data);
  }

  handleClosePopup(value: any) {
    this.isAdd = false;
    this.isEdit = false;
    if (value) {
      console.log('value popup');
    }
  }
}
