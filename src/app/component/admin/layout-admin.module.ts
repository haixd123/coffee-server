import {NgModule} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AdminComponent} from './admin.component';
import {RouterModule} from '@angular/router';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {SharedModule} from '../../shared/shared.module';
import {AdminLayoutRoutingModule} from './admin-layout-routing.module';
import {TableCoffeeBeanComponent} from './table-coffee-bean/table-coffee-bean.component';
import {TableEquipmentComponent} from './table-equipment/table-equipment.component';
import {TableUserComponent} from './table-user/table-user.component';
import {TablePostsComponent} from './table-posts/table-posts.component';

import {AddComponent} from './table-equipment/add/add.component';
import {EditComponent} from './table-equipment/edit/edit.component';
import {EditCoffeeBeanComponent} from './table-coffee-bean/edit/edit.component';
import {AddCoffeeBeanComponent} from './table-coffee-bean/add/add.component';
import {AddUserComponent} from './table-user/add/add.component';
import {EditUserComponent} from './table-user/edit/edit.component';
import {AddPostsComponent} from './table-posts/add/add.component';
import {EditPostsComponent} from './table-posts/edit/edit.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {BsDatepickerModule, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {BsDatepickerActions} from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import {DatePipe} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Api} from '../../services/api';
import {TableProductComponent} from './table-product/table-product.component';
import {EditProductComponent} from './table-product/edit/edit.component';
import {AddProductComponent} from './table-product/add/add.component';
import {TranslateModule} from '@ngx-translate/core';
import {BillComponent} from './table-bill/bill.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [AdminComponent, TableProductComponent, TableCoffeeBeanComponent, TableEquipmentComponent, TableUserComponent, AddComponent, EditComponent, TablePostsComponent, AddComponent, EditComponent, EditCoffeeBeanComponent, AddCoffeeBeanComponent, AddUserComponent, EditUserComponent, AddPostsComponent, EditPostsComponent, TableProductComponent, EditProductComponent, AddProductComponent, BillComponent],
  imports: [
    NzFormModule,
    NgZorroAntdModule,
    SharedModule,
    CKEditorModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    TranslateModule,
    NgxChartsModule
    // BsDatepickerModule.forRoot(),
    // AdminLayoutRoutingModule,
    // NzDropDownModule,
    // NzBreadCrumbModule,
  ],
  providers: [Api]
})
export class LayoutAdminModule {
}
