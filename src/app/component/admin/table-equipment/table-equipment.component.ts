import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';
import {SearchModelEntity} from '../search-model-entiry';

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

  data: any[];
  dataEdit: any;
  total: number;
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
    // this.changePage();
  }


  ngOnInit(): void {
  }


  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/equipment/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    // this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, false);
  }


  handleAdd() {
    this.isAdd = true;
  }

  handleEdit(item: any) {
    this.isEdit = true;
    this.dataEdit = item;
    this.isEdit = true;
  }

  handleClosePopup(value: any) {
    this.isAdd = false;
    this.isEdit = false;
    if (value) {
      this.changePage();
    }
  }

  handleDelete(item: any) {
    this.http.post('http://localhost:8080/api/equipment/delete', item).subscribe((data: any) => {
      if (data.errorCode == '00') {
        this.notificationService.showMessage('success', 'Xóa loại cafe thành công');
        this.isEdit = false;
      } else {
        this.notificationService.showMessage('error', 'Xóa loại cafe thất bại');
        this.isEdit = false;
      }
      this.changePage();
    });
  }
}
