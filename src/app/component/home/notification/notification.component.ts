import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../../admin/search-model-entiry';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnChanges {
  @Input() dataInfoUserNotification: any;
  searchModel: SearchModelEntity = new SearchModelEntity();

  dataUser: any[];

  infoUserIsActive: any;

  constructor(
    private http: HttpClient

  ) {
    this.infoUserIsActive = JSON.parse(localStorage.getItem('user')).id;
  }

  ngOnChanges() {
  }

  ngOnInit(): void {

  }

  handleSearch() {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 298;

    this.http.post('http://localhost:8080/api/authors/user/search', this.searchModel).toPromise().then((data: any) => {
      this.dataUser = data.data;
    });
  }

  }
