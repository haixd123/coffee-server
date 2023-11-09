import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {SearchModelEntity} from '../search-model-entiry';
import {NotificationService} from '../../../services/notification.service';
import {NzTableFilterFn, NzTableFilterList, NzTableQueryParams, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd';

interface DataItem {
  STT: number;
  Id: number;
  like1: number;
  share: number;
  comment: number;
  title: string;
  contentPost: string;
  contentDetail: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  Action: any;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.scss']
})

export class TablePostsComponent implements OnInit {

  // listOfColumns: ColumnItem[] = [
  //   {name: 'STT'},
  //   {name: 'Id'},
  //   {
  //     name: 'Like',
  //     sortFn: (a: DataItem, b: DataItem) => a.like1 - b.like1
  //       // => {
  //       // for (const item of this.data) {
  //       //   item.share - item.like;
  //       // }}
  //   },
  //   {name: 'Share'},
  //   {name: 'Comment'},
  //   {name: 'title'},
  //   {name: 'Content Post'},
  //   {name: 'Content Detail'},
  //   {name: 'imagePath'},
  //   {name: 'createdAt'},
  //   {name: 'updatedAt'},
  //   {name: 'Action'}];

  // listOfData: DataItem[] = [
  //   {
  //     STT: number;
  //     Id: number;
  //     Like: number;
  //     Share: number;
  //     Comment: number;
  //     title: string;
  //     contentPost: string;
  //     contentDetail: string;
  //     imagePath: string;
  //     createdAt: string;
  //     updatedAt: string;
  //     Action: any;
  //   }
  // ]


  formSearch: FormGroup;
  isAdd = false;
  isEdit = false;
  data: any[];
  dataEdit: any;
  total: number;
  searchModel: SearchModelEntity = new SearchModelEntity();
  curPage: number;
  testSort: any[];

  orderHeader = '';

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

  sort() {
  }

  handleUpdate(searchModel: SearchModelEntity, reset = false) {
    this.http.post('http://localhost:8080/api/posts/search', this.searchModel).toPromise().then((data: any) => {
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
  }

  handleClosePopup(value: any) {
    this.isAdd = false;
    this.isEdit = false;
    if (value) {
      this.changePage();
    }
  }

  handleDelete(item: any) {
    this.http.post('http://localhost:8080/api/posts/delete', item).subscribe((data: any) => {
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
