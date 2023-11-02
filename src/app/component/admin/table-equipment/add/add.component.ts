import {Component, EventEmitter , Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-add-equipment',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formAdd: FormGroup;
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formAdd = this.fb.group({
      name: null,
      title: null,
      contentEquipment: null
    });
  }

  ngOnInit(): void {
  }


  showModal(): void {
    this.isAdd = true;
  }

  handleOk(): void {
    this.http.post('http://localhost:8080/api/equipment/create', this.formAdd.value).toPromise().then((data: any) => {
      console.log('data: ', data);
    });
    this.handleCancel(true);
    this.formAdd.reset();
    this.isAdd = false;
  }

  handleCancel(value): void {
    console.log('Button cancel clicked!');
    this.isAdd = false;
    this.closePopup.emit(value);
  }
}
