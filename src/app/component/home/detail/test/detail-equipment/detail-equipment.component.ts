import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SearchModelEntity} from '../../../../admin/search-model-entiry';
import {Api} from '../../../../../services/api';

@Component({
  selector: 'app-detail-equipment',
  templateUrl: './detail-equipment.component.html',
  styleUrls: ['./detail-equipment.component.scss']
})
export class DetailEquipmentComponent implements OnInit, OnChanges {
  @Input() equipmentId: any;
  // myCode: any;
  formSearch: FormGroup;
  searchModel: SearchModelEntity = new SearchModelEntity();
  test1: any;

  dataEquipment: any[];

  slugEquipmentDetail: any;
  constructor(
    private http: HttpClient,
  private api: Api,

  ) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 30;
    this.api.getListEquipment(this.searchModel).toPromise().then((data: any) => {
      this.dataEquipment = data.data;
    });
    this.slugEquipmentDetail = localStorage.getItem('equipmentId');

  }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

}
