import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {Api} from '../../../services/api';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  formSearch: FormGroup;

  data: any[];
  total: number;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage = 1;

  constructor(
    private fb: FormBuilder,
    public validateService: ValidateService,
    private api: Api,
  ) {
    this.formSearch = this.fb.group({
      pageIndex: 1,
      pageSize: 10,
      name: null,
    });
    this.handleSearch();
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.api.getListBill(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    this.handleUpdate(this.searchModel, false);
  }

}
