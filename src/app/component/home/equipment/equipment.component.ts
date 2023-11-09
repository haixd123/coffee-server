import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchModelEntity} from '../../admin/search-model-entiry';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  searchModel: SearchModelEntity = new SearchModelEntity();

  equipmentId: any;
  data: any[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.searchModel.pageIndex = 1;
    this.searchModel.pageSize = 16;
    this.http.post('http://localhost:8080/api/equipment/search', this.searchModel).toPromise().then((data: any) => {
      this.data = data.data;
    });
  }

  ngOnInit(): void {
  }

  equipmentDetail(item: any) {
    this.equipmentId = item.id;
    localStorage.setItem('equipmentId', item.id);
    // setTimeout(() => {
    this.router.navigate(['/home/detail/equipment']);
    // }, 100);
    // this.router.navigate(['/home/test']);
  }
}
