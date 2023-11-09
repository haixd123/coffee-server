import {Component, OnChanges, OnInit} from '@angular/core';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {
  searchModel: SearchModelEntity = new SearchModelEntity();
  data: any[];
  total: number;
  idUserLocalstorage: string;
  isFixInfo = true;

  constructor(
    private http: HttpClient,
  ) {
    this.handleSearch();
    this.idUserLocalstorage = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnChanges() {
    this.idUserLocalstorage = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnInit(): void {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/user/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 10;
    this.handleUpdate(this.searchModel, true);
  }

  handleChangeAvatar() {

  }

  handleupdateInfo() {
    this.isFixInfo = false;
  }

}
