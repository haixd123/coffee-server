import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchModelEntity} from '../search-model-entiry';
import {Api} from '../../../services/api';
import {HttpClient} from '@angular/common/http';
import {ValidateService} from '../../../services/validate-service';
import {NotificationService} from '../../../services/notification.service';


// export var productSales = [
//   {
//     "name": "book",
//     "value": 12001
//   }, {
//     "name": "graphic card",
//     "value": 14322
//   }, {
//     "name": "desk",
//     "value": 1726
//   }, {
//     "name": "laptop",
//     "value": 2599
//   }, {
//     "name": "monitor",
//     "value": 705
//   }
// ];


// export var productSalesMulti = [
//   {
//     "name": "book",
//     "series": [
//       {
//         "name": "January",
//         "value": 125
//       }, {
//         "name": "February",
//         "value": 197
//       }, {
//         "name": "March",
//         "value": 209
//       }
//     ]
//   }, {
//     "name": "graphic card",
//     "series": [
//       {
//         "name": "January",
//         "value": 210
//       }, {
//         "name": "February",
//         "value": 255
//       }, {
//         "name": "March",
//         "value": 203
//       }
//     ]
//   }, {
//     "name": "desk",
//     "series": [
//       {
//         "name": "January",
//         "value": 89
//       }, {
//         "name": "February",
//         "value": 105
//       }, {
//         "name": "March",
//         "value": 66
//       }
//     ]
//   }, {
//     "name": "laptop",
//     "series": [
//       {
//         "name": "January",
//         "value": 178
//       }, {
//         "name": "February",
//         "value": 165
//       }, {
//         "name": "March",
//         "value": 144
//       }
//     ]
//   }, {
//     "name": "monitor",
//     "series": [
//       {
//         "name": "January",
//         "value": 144
//       }, {
//         "name": "February",
//         "value": 250
//       }, {
//         "name": "March",
//         "value": 133
//       }
//     ]
//   }
// ]

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
  pageSizeOptions: number[] = [10, 50, 100];
  pageSize = 10;


  view: any[] = [1400, 430];
  legendTitle: string = 'Products';
  legendPosition: string = 'below';
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  xAxisLabel: string = 'Products';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 10000, 15000]
  animations: boolean = true; // animations on load
  showGridLines: boolean = true; // grid lines
  showDataLabel: boolean = true; // numbers on bars
  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'
  barPadding: number = 5
  tooltipDisabled: boolean = false;
  roundEdges: boolean = false;

  test = 12000;


  productSales1 = [
    {
      "name": "Tháng 1",
      "value": `${this.test}`
    }, {
      "name": "Tháng 2",
      "value": 14322
    }, {
      "name": "Tháng 3",
      "value": 1726
    }, {
      "name": "Tháng 4",
      "value": 2599
    }, {
      "name": "Tháng 5",
      "value": 705
    }, {
      "name": "Tháng 6",
      "value": 705
    }, {
      "name": "Tháng 7",
      "value": 705
    }, {
      "name": "Tháng 8",
      "value": 705
    }, {
      "name": "Tháng 9",
      "value": 705
    }, {
      "name": "Tháng 10",
      "value": 705
    }, {
      "name": "Tháng 11",
      "value": 705
    }, {
      "name": "Tháng 12",
      "value": 705
    }
  ];


  constructor(
    private fb: FormBuilder,
    public validateService: ValidateService,
    private api: Api,
    private notificationService: NotificationService,
  ) {
    this.formSearch = this.fb.group({
      pageIndex: 1,
      pageSize: 10,
      name: null,
    });
    // Object.assign(this, {productSales});
    this.handleSearch();
  }

  ngOnInit(): void {
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
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
    if (this.formSearch.get('name').value == '') {
      this.formSearch.get('name').setValue(null);
    }
    this.searchModel = Object.assign({}, this.searchModel, this.formSearch.value);
    this.handleUpdate(this.searchModel, true);
  }

  changePage() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = 10;
    this.handleUpdate(this.searchModel, false);
  }

  onPageSizeChange(value: any) {
    this.pageSize = value;
  }

  export() {
    this.searchModel.pageIndex = this.curPage;
    this.searchModel.pageSize = this.pageSize;
    this.api.exportBill(this.searchModel).subscribe((res: any) => {
      console.log('res: ', res)
      if (res.errorCode == '00') {
        this.notificationService.showMessage('success', 'success');
      } else {
        this.notificationService.showMessage('error', 'error');
      }
    }, error => console.log('err: ', error))
  }


}
