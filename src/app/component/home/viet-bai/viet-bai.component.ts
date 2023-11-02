import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-viet-bai',
  templateUrl: './viet-bai.component.html',
  styleUrls: ['./viet-bai.component.scss']
})
export class VietBaiComponent implements OnInit{
  title = 'angular';
  public Editor = ClassicEditor;

  formAdd: FormGroup;
  // @ts-ignore
  defaultFileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error'
    }
  ];

  fileList1 = [...this.defaultFileList];
  fileList2 = [...this.defaultFileList];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  Submit() {
    this.http.post('http://localhost:8080/api/posts/create', this.formAdd.value).toPromise().then((data: any) => {
      console.log('data: ', data);
    });
    this.formAdd.reset();
  }

}
