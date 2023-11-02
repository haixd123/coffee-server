import {NgModule} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {SharedModule} from '../../shared.module';
import {HomeComponent} from './home.component';
import {HomePostsComponent} from './posts/home-posts.component';
import {HomeCoffeeBeanComponent} from './home-coffee-bean/home-coffee-bean.component';
import {VietBaiComponent} from './viet-bai/viet-bai.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {PostsDetailComponent} from './posts-detail/posts-detail.component';
import {TestCkeditorComponent} from './test-ckeditor/test-ckeditor.component';
import {CkeditorDetailComponent} from './detail-coffee-bean/ckeditor-detail.component';
import {EquipmentComponent} from './equipment/equipment.component';

@NgModule({
  declarations: [HomeComponent, HomePostsComponent, HomeCoffeeBeanComponent, VietBaiComponent, PostsDetailComponent, TestCkeditorComponent, CkeditorDetailComponent, EquipmentComponent, PostsDetailComponent],
  imports: [NzFormModule, NgZorroAntdModule, SharedModule,
    RouterModule.forChild([]),
    // HomeLayoutRoutingModule,
    NzDropDownModule,
    NzBreadCrumbModule, CKEditorModule],
  providers: []
})
export class LayoutHomeModule {
}
