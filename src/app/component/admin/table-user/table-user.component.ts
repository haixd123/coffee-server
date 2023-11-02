import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';


interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-account-management',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {

  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;
  data: any[];
  total: number;
  dataEdit: any;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validateService: ValidateService,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      pageIndex: this.searchModel.pageIndex,
      pageSize: 10,
    });
    this.handleSearch();
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/user/search', this.searchModel).toPromise().then((data: any) => {
      console.log('1: ', data);
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    console.log('this.searchModel | handleSearch: ', this.searchModel);
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    console.log('this.searchModel | test ', this.searchModel);
    console.log('this.curPage | test ', this.curPage);
    this.handleUpdate(this.searchModel, false);
  }

  handleAdd() {
    this.isAdd = true;
  }

  handleEdit(item: any) {
    this.isEdit = true;
    this.dataEdit = item;
    console.log('item: ', item);
  }

  handleClosePopup(value: any) {
    this.isAdd = false;
    this.isEdit = false;
    if (value) {
      console.log('value popup');
      this.changePage();
    }
  }

  handleDelete(item: any) {
    this.http.post('http://localhost:8080/api/user/delete', item).toPromise().then((data: any) => {
      console.log('data delete: ', data);
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa bài đăng thành công');
        this.isEdit = false;
      } else {
        this.notificationService.showMessage('error', 'Xóa bài đăng thất bại');
        this.isEdit = false;
      }
      this.changePage();
    });
  }
}
