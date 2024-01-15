import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchModelEntity} from '../../admin/search-model-entiry';
import {ShareDataService} from '../../../services/share-data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Api} from '../../../services/api';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  searchModel: SearchModelEntity = new SearchModelEntity();
  formSearch: FormGroup;
  equipmentId: any;
  data: any[];
  total: number;

  searchEquipment: string;

  curPage: number;


  constructor(
    private http: HttpClient,
    private router: Router,
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private api: Api,
  ) {
    this.formSearch = this.fb.group({
      name: null,
    });
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 12;
    this.api.getListEquipment(this.searchModel).toPromise().then((data: any) => {
      console.log('data: ', data)
      this.data = data.data;
      this.total = data.optional;
    });
  }

  ngOnInit(): void {
  }

  equipmentDetail(item: any) {
    this.shareDataService.sendDataCategory('Trang thiết bị');
    localStorage.setItem('postsCategory', 'Trang thiết bị');

    localStorage.setItem('equipmentId', item.id);
    // setTimeout(() => {
    this.router.navigate(['/home/detail/equipment', item.name]);
    // }, 100);
    // this.router.navigate(['/home/test']);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 12;
    this.api.getListEquipment(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
      this.total = data.optional;
    });
  }


  handleSearchInput() {
    if (this.searchEquipment != null) {
      this.formSearch.get('name').setValue(this.searchEquipment);
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    }
    if (this.searchEquipment == '') {
      this.formSearch.get('name').setValue(null);
      this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    }
    this.api.getListEquipment(this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
    });
  }
}
