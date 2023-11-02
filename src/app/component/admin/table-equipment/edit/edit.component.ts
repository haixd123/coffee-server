import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() dataEdit: any;
  @Input() disable: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();



  formEdit: FormGroup;
  isVisible = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isEdit = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isEdit = false;
  }

  handleCancel(value: any): void {
    console.log('Button cancel clicked!');
    this.isEdit = false;
    this.closePopup.emit(value);
  }
}
