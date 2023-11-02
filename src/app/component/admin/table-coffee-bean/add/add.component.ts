import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EditCoffeeBeanComponent} from '../edit/edit.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../services/notification.service';


@Component({
  selector: 'app-add-coffee-bean',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCoffeeBeanComponent implements OnInit {
  formAdd: FormGroup;
  @Input() isAdd: boolean;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.formAdd = this.fb.group({
      name: null,
      title: null,
      status: null,
      contentCoffee: null
    });
  }

  ngOnInit(): void {
  }


  showModal(): void {
    this.isAdd = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.http.post('http://localhost:8080/api/coffee/create', this.formAdd.value).toPromise().then((data: any) => {
      console.log('data: ', data);
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Thêm loại cafe mới thành công');
        this.handleCancel(true);
      } else {
        this.notificationService.showMessage('error', 'Thêm loại cafe mới thất bại');
        this.handleCancel(true);
      }
    });
    this.handleCancel(true);
    this.isAdd = false;
    this.formAdd.reset();
  }

  handleCancel(value): void {
    console.log('Button cancel clicked!');
    this.isAdd = false;
    this.closePopup.emit(value);
  }


}
