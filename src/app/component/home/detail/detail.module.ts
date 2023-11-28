import {NgModule} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CkeditorDetailComponent} from './test/detail-coffee-bean/ckeditor-detail.component';
import {DetailEquipmentComponent} from './test/detail-equipment/detail-equipment.component';
import {PostsDetailComponent} from './test/detail-posts/posts-detail.component';
import {DetailComponent} from './detail.component';

@NgModule({
  declarations: [CkeditorDetailComponent, DetailEquipmentComponent, PostsDetailComponent, DetailComponent],
  imports: [NzFormModule, NgZorroAntdModule, SharedModule,
    RouterModule.forChild([]),
    CKEditorModule],
    exports: [
        DetailEquipmentComponent,
        PostsDetailComponent,
        CkeditorDetailComponent,
        DetailComponent
    ],
  providers: []
})
export class DetailModule {
}
